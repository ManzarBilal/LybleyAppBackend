const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
      image:{type:String,required:true},
      title:{type:String,required:true},
      content:{type:String,required:true},
},{timestamps:true});

const blogModel=new mongoose.model("blog",blogSchema);

module.exports=blogModel;