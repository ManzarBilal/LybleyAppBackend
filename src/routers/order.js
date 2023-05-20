const express=require("express");
const router=new express.Router();
const Order=require("../models/order");
const Technician=require("../models/technicianStatus");

router.post("/createOrder",async(req,res)=>{
    try{
      let body=req.body;
      let order=new Order(body);
      let order1=await order.save();
      res.send(order1);
    }catch(err){
        res.status(400).send(err);
    }
});

//Technician Status for Order

router.post("/createTechnicianStatus",async(req,res)=>{
    try{
      let body=req.body;
      let exist = await Technician.findOne({orderId:body.orderId});
      if (exist) {
        await Technician.updateOne({orderId:body.orderId},{status:body.status});
        res.send({status:true,msg:"Updated"});
      }else{
      let status=new Technician(body);
      let status1=await status.save();
      res.send(status1);
      }
    }catch(err){
        res.status(400).send(err);
    }
});

router.get("/getTechnicianStatus/:id",async(req,res)=>{
    try{
       let id=req.params.id
       let status=await Technician.findOne({orderId:id});
       res.send(status);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get("/getAllOrder",async(req,res)=>{
    try{
       let orders=await Order.find({});
       res.send(orders);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get("/getOrderById/:id",async(req,res)=>{
    try{
        let _id=req.params.id
       let orders=await Order.findById(_id);
       res.send(orders);
    }catch(err){
        res.status(400).send(err);
    }
});


router.get("/getOrderByCustomer/:id",async(req,res)=>{
    try{
       let id=req.params.id; 
       let orders=await Order.find({customerId:id});
       res.send(orders);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get("/getOrderBy/:id",async(req,res)=>{
    try{
       let id=req.params.id; 
       let order=await Order.findOne({customerId:id});
       res.send(order);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports=router;
