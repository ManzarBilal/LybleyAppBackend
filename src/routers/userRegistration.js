const express = require("express");
const router = new express.Router();
const fast2sms = require('fast-two-sms');
const otpGenerator = require('otp-generator')
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JWTStrategry = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../models/userRegistrationModel");
const app=express();

app.use(passport.initialize());


function smsSend(otp,mobile){
    let options = {authorization :"oST3Je8bKsi6hGZjd9MHx047OmLrWcEDqAufIU51CnXpaBVtRPxqR3ZKJPHyWboQlOpAzstmL78j5cwS" , message : `This is from LY3LEY, Your OTP code is ${otp}` ,  numbers : [mobile]}

    fast2sms.sendMessage(options)
    .then((res)=>{
        console.log("res",res)
    }).catch((err)=>{
      console.log(err);
    }) 
  }

const params={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secrectOrKey:"jwtsecret536372826"
}
const jwtExpirySeconds=300;

// let strategy = new JWTStrategry(params,function(token,done){
//     console.log("In JWTStrategy",token);
//     let emp1 = employees.find(e1=>e1.empCode=== +token.empCode);
//     console.log("employee",emp1);
//     if(!emp1)
//     return done(null,false,{message:"Incorrect empCode or name"});
//     else return done(null,user);
// });

router.post("/userRegistration", async (req, res) => {
    try {
        let body = req.body;
        let existUser = await UserModel.findOne({ email: body.email });
        if (existUser) {
            res.json({ status: false, msg: "Email already exists" });
        } else {
            let otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
            smsSend(otp,body.contact);
            let obj={...body,otp:otp};
            let user = new UserModel(obj);
            let user1 = await user.save();
            res.json({ status: true, msg: "User registration successfully" });
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/userLogin", async (req, res) => {
    try {
        let body = req.body;
        let checkUser = await UserModel.findOne({ email: body.email, password: body.password });
        if (checkUser) {
            let payload={_id:checkUser._id};
            let token=jwt.sign(payload,params.secrectOrKey,{
                algorithm:"HS256",
                expiresIn:jwtExpirySeconds
            })
            res.json({ status: true, user: checkUser, msg: "User Login successfully",token:"bearer "+token});
        } else {
            res.json({ status: false, msg: "Incorrect Username and Password" });
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

router.patch("/otpVerification",async (req,res)=>{
    try{
        let body=req.body;
        let user=await UserModel.findOne({email:body.email,otp:body.otp});
        if(user){
        let user1=await UserModel.findByIdAndUpdate({_id:user._id},{status:"ACTIVE"});
        res.json({status:true,msg:"Verified"});
        }else{
            res.send({status:false,msg:"Incorrect OTP"});
        }
    }catch(err){
        res.status(500).send(err);
    }
});

router.post("/resendOtp",async (req,res)=>{
    try{
        let body=req.body;
        let otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
        let user=await UserModel.findOneAndUpdate({email:body.email},{otp:otp});
        if(user){
            smsSend(otp,user.contact);
            res.json({status:true,msg:"Re-send OTP"});
        }else{
            res.status(404).json({status:false , msg:"Not found"});
        }
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;