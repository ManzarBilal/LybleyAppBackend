const express=require("express");
const router= new express.Router();
const Razorpay=require("razorpay");
const crypto=require("crypto");
const { default: axios } = require("axios");
require("dotenv");

const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

router.post("/payment",async(req,res)=>{
     try{
   const order=await instance.orders.create({
        amount: (+req.body.amount)*100,
        currency: "INR",
      });
      res.send(order);
     }catch(err){
          res.status(400).send(err);
     }
});

router.post("/paymentVerification",async(req,res)=>{
     const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body.response;
     const body=razorpay_order_id + "|" + razorpay_payment_id;
     const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");
     const isAuthentic=expectedSignature===razorpay_signature;
     if(isAuthentic){
      res.status(200).json({status:true});
     }else{
      res.status(400).json({status:false});
     }
});

router.post("/brandDuePayment",async(req,res)=>{
      let body=req.body;
      try{
      let payResponse = await axios.post(`https://api.razorpay.com/v1/payouts`, body,{headers:{'Authorization':"Basic " + new Buffer.alloc(process.env.RAZORPAY_KEY_ID + ":" + process.env.RAZORPAY_KEY_SECRET).toString("base64")}});
      console.log(payResponse);
      res.send(payResponse);
      }catch(err){
          res.status(400).send(err);
      }
});

module.exports=router;