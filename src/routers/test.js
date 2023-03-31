const express=require("express");
const router= new express.Router();

router.get("/getData",async (req,res)=>{
    res.send("dfghjkoiuytresxcvbn");
});

module.exports=router;