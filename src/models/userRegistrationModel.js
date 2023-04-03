const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    contact:{type:Number,required:true},
    password:{type:String,required:true},
    otp:{type:String},
},{timestamps:true});

const UserModel = new mongoose.model("users",userSchema);

module.exports=UserModel;