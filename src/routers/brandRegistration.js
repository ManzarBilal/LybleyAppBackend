const express = require("express");
const router = new express.Router();
const BrandModel = require("../models/brandRegistrationModel");

router.post("/brandRegistration",async (req,res)=>{
    let body=req.body;
    try{
        let brand=new BrandModel(body);
        let newBrand=await brand.save();
        res.json({
            status:true,
            msg:"Registerd successfully"
        })
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports=router;