const express=require("express");
const router= new express.Router();
const Razorpay=require("razorpay");

const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

router.post("/payment",async(req,res)=>{
   const order=await instance.orders.create({
        amount: (+req.body.amount)*100,
        currency: "INR",
      });
      res.send(order);
});

module.exports=router;