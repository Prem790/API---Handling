import express from "express";



const app=express();

const port=process.env.PORT || 3000;

app.get('/api/products',(req,res)=>{
    const products=[
        {
            id: 1,
            name:"table wooden",
            price:200,
            image:"https://media.istockphoto.com/id/1474460592/photo/dark-wooden-table-isolated-on-white-background-empty-wood-tabletop.jpg?s=612x612&w=0&k=20&c=BShPD74bbrIJfYoD32_b3sZj7Hqpg7RF6p0yjB-WoVo="
        },
        {
            id: 2,
            name:"table glass",
            price:500,
            image:"https://rukminim2.flixcart.com/image/750/900/kyt0ya80/furniture-accessory/n/y/h/square-glass-table-top-for-centre-coffee-sofa-table-24x24-inch-original-imagaymcgqdr3yss.jpeg?q=20&crop=false"
        },
        {
            id: 3,
            name:"table polyester",
            price:800,
            image:"https://images-eu.ssl-images-amazon.com/images/I/71g7uUz99lL._AC_UL600_SR600,600_.jpg"
        },
    ]

    //http://localhost:3000/api/products?search=metal
    //what if we want search products based on name for that
    //we need to use query string to filter products based on some condiion

    if(req.query.search){
        const filterProducts=products.filter(product=>
            product.name.includes(req.query.search)
        )
        res.send(filterProducts);
        return;
    }



    setTimeout(() => {
        res.send(products);
    }, 3000);
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})