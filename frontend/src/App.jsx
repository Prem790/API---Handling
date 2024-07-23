import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  //we can use like this .this iis generic or we can create a hook for this

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  //defined a search state for search

  useEffect(() => {
    const controller=new AbortController()
    //since we are an ifi here we need to use semicolon beofre async before js does not where orur ifi starts so putting semicolon tells that is start of ifi funcyion.precautionary measure
    ;(async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/products?search=" + search , {
          signal:controller.signal
        });
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return;
          
        }
        setError(true);
        setLoading(false);
      }
    })();


    //cleanup function to unmount the controller
    return()=>{
      controller.abort();
    }


  }, [search]); // dependency array is provided with search so that it is called gagain and again when we search something

  // the probelm is if we search something there is race condition going on eg if i search w then wo then woo then all there will be race condition among all and hence our memory is affected. if only want our final search to be affected which is woo and not w and wo . for that we will use axios function abortConttroller


  // ()() ;- iif--immediately invoked function

  //const [products,error,loading]=customReactQuery("/api/products");

  /*
  if(error){
    return <h1>Something went wrong</h1>
  }
  if(loading){
    return <h1>Loading...</h1>
  }
    */

  //INSTEAD OF RETURNING error and loading we can do conditional rendering also
  //we have to attach input with a search wuery in api call 

  return (
    <>
      <h1>Handling API's Like a Pro</h1>

      <input type="text" placeholder="search"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}

      ></input>
      

      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong</h1>}
      <h2>Number of products are : {products.length}</h2>
    </>
  );
}

export default App;

//we can create a custom react query function for above generic function of calling api

/*
const customReactQuery=(urlPath)=>{
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading , setLoading]=useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(urlPath);
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  return [products,error,loading];

  
}
  */
