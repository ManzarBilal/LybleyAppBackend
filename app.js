const express = require("express");
require("./src/db/connection");
const router = require("./src/routers/userRegistration");
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
app.use(router);

const port = 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});