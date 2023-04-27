const mongoose=require("mongoose");

const videoUpload=new mongoose.Schema({
    video:{type:String,required:true},
    productModel:{type:String,required:true},
},{timestamps:true})

const videoModel=new mongoose.model("video",videoUpload);

module.exports=videoModel;