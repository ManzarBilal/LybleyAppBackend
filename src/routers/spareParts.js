const express=require("express");
const router=new express.Router();
const sparePartModel=require("../models/sparePartsModel");
const {upload} =require("../services/service");

router.post("/addSparePart",upload().array("images"),async(req,res)=>{
       try{
        let body=req.body;
        let files=req.file;
        let images=files?.map(f1=> f1.location);
        console.log(files)
        let obj=new sparePartModel({...body,images:images});
        let data=await obj.save();
        res.json({status:true,msg:"Spare part added successfully"});
       }catch(err){
        res.status(400).send(err);
       }
});

router.patch("/updateSparePart/:id",async(req,res)=>{
    try{
     let _id=req.params.id; 
     let body=req.body;
     let obj= await sparePartModel.findByIdAndUpdate(_id,body);
     res.json({status:true,msg:"Spare part updated successfully"});
    }catch(err){
     res.status(500).send(err);
    }
});

router.get("/allSparePart",async(req,res)=>{
     try{
      let data=await sparePartModel.find({});
      res.send(data); 
     }catch(err){
        res.status(400).send(err);
     }
});

router.get("/sparePart/:id",async(req,res)=>{
    try{
     let id=req.params.id; 
     let data=await sparePartModel.find({productId:id});
     res.send(data); 
    }catch(err){
       res.status(400).send(err);
    }
});

router.delete("/deleteSparePart/:id",async(req,res)=>{
    try{
     let _id=req.params.id; 
     let obj= await sparePartModel.findByIdAndDelete(_id);
     res.json({status:true,msg:"Spare part deleted successfully"});
    }catch(err){
     res.status(500).send(err);
    }
});

module.exports=router;
