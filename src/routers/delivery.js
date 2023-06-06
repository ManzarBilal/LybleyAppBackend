const express=require("express");
const router=new express.Router();
const axios=require("axios");
const Order=require("../models/order");

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM1OTEyMTcsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjg1OTU5NjM2LCJleHAiOjE2ODY4MjM2MzYsIm5iZiI6MTY4NTk1OTYzNiwianRpIjoiN3ZPWUZxc2FrOTRFYkdsNiJ9.jUKwxXwlGGV_i-BCrKJAfBbtCtQ9gIexRitzI1i9DX0";

// "id": 3591217,
// "first_name": "API",
// "last_name": "USER",
// "email": "help@sparetrade.in",
// "company_id": 278522,


router.post("/createDeliveryOrder",async(req,res)=>{
       try{
          let body=req.body;
          let response=await axios.post("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",body,{headers:{'Authorization':`Bearer ${token}`}});
          let {data}=response;
          await Order.updateOne({_id:body.order_id},{shipOrderId:data?.order_id,shipmentId:data?.shipment_id});
          res.send(data);
       }catch(err){
          res.status(400).send(err.response.data);
       }
});
router.get("/trackOrder/:id",async(req,res)=>{
   try{
      let body=req.body;
      let id =req.params.id
      let response=await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track?order_id=${id}`,{headers:{'Authorization':`Bearer ${token}`}});
      let {data}=response;
      res.send(data);
   }catch(err){
      res.status(400).send(err.response.data);
   }
});

router.get("/getAllReturns",async(req,res)=>{
   try{
    let data=await axios.get("https://apiv2.shiprocket.in/v1/external/orders/processing/return",{headers:{'Authorization':`Bearer ${token}`}});
    res.send(data);
   }catch(err){
      console.log(err);
   }
});

router.get("/getSpecificOrder/:id",async(req,res)=>{
   try{
      let id =req.params.id
      let response=await axios.get(`https://apiv2.shiprocket.in/v1/external/orders/show/${id}`,{headers:{'Authorization':`Bearer ${token}`}});
      let {data}=response;
      res.send(data);
   }catch(err){
      res.status(400).send(err.response.data);
   }
});

router.post("/cancelOrder",async(req,res)=>{
   try{
      let body=req.body;
      let response=await axios.post("https://apiv2.shiprocket.in/v1/external/orders/cancel",body,{headers:{'Authorization':`Bearer ${token}`}});
      let {data}=response;
      res.send(data);
   }catch(err){
      res.status(400).send(err.response.data);
   }
});
router.post("/returnOrder",async(req,res)=>{
   try{
      let body=req.body;
      let response=await axios.post("https://apiv2.shiprocket.in/v1/external/orders/create/return",body,{headers:{'Authorization':`Bearer ${token}`}});
      let {data}=response;
      res.send(data);
   }catch(err){
      res.status(400).send(err.response.data);
   }
});
module.exports=router;