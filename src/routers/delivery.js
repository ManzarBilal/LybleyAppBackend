const express=require("express");
const router=new express.Router();
const axios=require("axios");

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM1OTEyMTcsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjg0OTk2NjMyLCJleHAiOjE2ODU4NjA2MzIsIm5iZiI6MTY4NDk5NjYzMiwianRpIjoiWnZsS0dtYkZhNXNHMWJ5MSJ9.1AHfH1T3xFFR-e1hz20WVgk2iQq1_taNYeMwRr54cPE";

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
          res.send(data);
       }catch(err){
          res.status(400).send(err.response.data);
       }
});

module.exports=router;