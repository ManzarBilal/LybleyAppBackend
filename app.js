const express = require("express");
require("./src/db/connection");
const user = require("./src/routers/userRegistration");
const brand = require("./src/routers/brandRegistration");
const productCategory=require("./src/routers/brandProductCategories")
const brandProducts=require("./src/routers/brandProduct");
const app=express();

app.use(express.json());
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(user);
app.use(brand);
app.use(productCategory)
app.use(brandProducts);

const port = 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});