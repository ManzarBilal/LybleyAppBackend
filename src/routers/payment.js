const express=require("express");
const router= new express.Router();
const Razorpay=require("razorpay");
const crypto=require("crypto");

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

module.exports=router;