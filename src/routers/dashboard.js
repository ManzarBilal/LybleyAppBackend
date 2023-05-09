const express=require("express");
const router=new express.Router();
const Customers=require("../models/userRegistrationModel");
const Orders=require("../models/order");
const SpareParts=require("../models/sparePartsModel");

router.get("/dashboardDetails",async(req,res)=>{
     try{
          let customer=await Customers.find({});
          let order=await Orders.find({});
          let sparePart=await SpareParts.find({});
          res.json({
            totalCustomers:customer.length,
            totalOrders:order.length,
            sparePart:sparePart.length
          });
     }catch(err){
          res.status(400).send(err);
     }
});

module.exports=router;