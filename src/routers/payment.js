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
//RAZORPAY_KEY_ID="rzp_test_rrscy4JQbxWgbO"
//RAZORPAY_KEY_SECRET="mv7PsDsYBYg5fpeVlq0YkFVI"
//{headers:{Authorization:"Basic " + new Buffer.alloc("rzp_test_rrscy4JQbxWgbO" + ":" +"mv7PsDsYBYg5fpeVlq0YkFVI" ).toString("base64")}}
router.post("/brandDuePayment",async(req,res)=>{
      let body=req.body;
      try{
      let payResponse = await axios.post("https://api.razorpay.com/v1/payouts",body,{headers:{Authorization:"Basic " +new Buffer.alloc("rzp_test_rrscy4JQbxWgbO" + ":" +"mv7PsDsYBYg5fpeVlq0YkFVI" ).toString("base64")}});
      console.log(payResponse);
      res.send(payResponse);
      }catch(err){
       res.status(400).send(err); 
      }
});


router.post("/xpay",async (req,res) => {
     // try {
     //   const payoutOptions = {
     //     account_number: "20462883795",
     //     bank_code: "SBIN0000650",
     //     amount: 10000, // Amount in paise (e.g., 1000 paise = Rs. 10.00)
     //     currency: "INR",
     //     mode: "NEFT",
     //     purpose: "payout",
     //     queue_if_low_balance: 0,
     //     reference_id: "unique_reference_id",
     //     narration: "Payout for order #123456",
     //     notes: {
     //       note1: "Note 1",
     //       note2: "Note 2",
     //     },
     //   };
   
     // const payout = await instance.payouts.create(payoutOptions);
     //  res.send(payout);
     // } catch (error) {
     //   res.status(400).send(error);
     // }

//    const bk= await instance.payments.create(
//           {
//             bank_account: '20462883795',
//             amount: 10000, // Amount in paise (e.g., 10000 for ₹100)
//             currency: 'INR',
//             mode: 'NEFT', // Payment mode (NEFT, IMPS, RTGS, UPI)
//             purpose: 'vendor_payment',
//             queue_if_low_balance: 1,
//           },
//           (error, payment) => {
//             if (error) {
//               console.error(error);
//             } else {
//               console.log(payment);
//             }
//           }
//         );
//         res.send(bk)
     const options = {
          account_number: '20462883795',
          account_type: 'account',
          amount: 10000, // Amount in paise (e.g., 50000 paise = ₹500.00)
          currency: 'INR',
        };
        
        await instance.payouts.create(options, function (error, payout) {
          if (error) {
            console.error(error);
          } else {
            console.log(payout);
          }
        });
   });

//router.get("/xpay",initiatePayout);

module.exports=router;