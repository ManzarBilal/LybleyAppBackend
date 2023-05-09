const express=require("express");
const router=new express.Router();
const Order=require("../models/order");

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

router.get("/getAllOrder",async(req,res)=>{
    try{
       let orders=await Order.find({});
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

module.exports=router;