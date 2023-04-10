const express = require("express");
const router = new express.Router();
const BrandModel = require("../models/brandRegistrationModel");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JWTStrategry = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { smsSend,sendMail } = require("../services/service");

const params = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secrectOrKey: "jwtsecret6434568"
}

const jwtExpirySeconds = 300;

router.post("/brandRegistration", async (req, res) => {
    let body = req.body;
    console.log(body);
    try {
        let check = await BrandModel.findOne({email:body.email});
        console.log(check);
        let bool=false;
        if (check) {
            res.json({ status: false, msg: "Email already exists" });
        } else {
            console.log("else");
            let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            smsSend(otp, body.contact);
            sendMail(body.email,body.password,bool);
            let obj = { ...body, otp: otp };
            let brand = new BrandModel(obj);
            let newBrand = await brand.save();
            res.json({
                status: true,
                msg: "Registerd successfully"
            })
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/brandLogin", async (req, res) => {
    try {
        let body = req.body;
        let checkBrand = await BrandModel.findOne({ email: body.email, password: body.password });
        if (checkBrand) {
            let payload = { _id: checkBrand._id };
            let token = jwt.sign(payload, params.secrectOrKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds
            })
            if (checkBrand.status === "INACTIVE") {
                let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
                smsSend(otp, checkBrand.contact);
                await BrandModel.findByIdAndUpdate({ _id: checkBrand._id }, { otp: otp });
            }
            res.json({ status: true, user: checkBrand, msg: "Login successfully", token: "bearer " + token });
        } else {
            res.json({ status: false, msg: "Incorrect Username and Password" });
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

router.patch("/brandOtpVerification", async (req, res) => {
    try {
        let body = req.body;
        let brand = await BrandModel.findOne({ email: body.email, otp: body.otp });
        if (brand) {
            let brand1 = await BrandModel.findByIdAndUpdate({ _id: brand._id }, { status: "ACTIVE" });
            res.json({ status: true, msg: "Verified" });
        } else {
            res.send({ status: false, msg: "Incorrect OTP" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/brandResendOtp",async (req,res)=>{
    try{
        let body=req.body;
        let otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
        let brand=await BrandModel.findOneAndUpdate({email:body.email},{otp:otp});
        if(brand){
            smsSend(otp,brand.contact);
            res.json({status:true,msg:"OTP sent"});
        }else{
            res.json({status:false , msg:"Something went wrong!"});
        }
    }catch(err){
        res.status(400).send(err);
    }
});

router.patch("/brandForgetPassword",async(req,res)=>{
    try{
      let body=req.body;
      let bool=true;
      let brand=await BrandModel.findOneAndUpdate({email:body.email},{password:body.password});
      if(brand){
         res.json({status:true,msg:"Password changed successfully!"});
         sendMail(body.email,body.password,bool);
      }else{
         res.json({status:false,msg:"Something went wrong!"});
      }
    }catch(err){
     res.status(500).send(err);
    }
})


module.exports = router;