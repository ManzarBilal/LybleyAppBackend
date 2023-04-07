const mongoose=require("mongoose");

const brandSchema= new mongoose.Schema({
    brandName:{type:String,required:true},
    email:{type:String,required:true},
    contact:{type:Number,required:true},
    password:{type:String,required:true},
    gstNo:{type:String,required:true},
   // auth:{type:String,required:true},
    brandLogo:{type:String},
    brandBanner:{type:String},
    otp:{type:String},
    status:{type:String,default:"INACTIVE"},
},{timestamps:true});

const BrandModel = new mongoose.model("brand",brandSchema);

module.exports=BrandModel;