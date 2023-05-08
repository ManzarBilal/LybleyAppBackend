const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
     name:{type:String,required:true},
     contact:{type:String,required:true},
     email:{type:String},
     address:{type:String,required:true},
     address2:{type:String},
     items:{type:Array,required:true},
     pin:{type:String,required:true},
     state:{type:String,required:true},
     city:{type:String,required:true}
},{timestamps:true});

const order=new mongoose.model("order",orderSchema);

module.exports=order;