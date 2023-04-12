const mongoose=require("mongoose");

const brandSchema= new mongoose.Schema({
    brandName:{type:String,required:true},
    email:{type:String,required:true},
    contact:{type:Number,required:true},
    password:{type:String,required:true},
    gstNo:{type:String,required:true},
    gstDocument:{type:String,required:true},
    address:{type:String},
    brandLogo:{type:String},
    brandBanner:{type:String},
    otp:{type:String},
    status:{type:String,default:"INACTIVE"},
    role:{type:String,default:"BRAND"}
},{timestamps:true});

const BrandModel = new mongoose.model("brand",brandSchema);

module.exports=BrandModel;