const express = require("express");
require("./src/db/connection");
const router = require("./src/routers/userRegistration");
const app=express();

app.use(express.json());
app.use(router);

const port = 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});