const mongoose=require("mongoose");

const brandProductSchema= new mongoose.Schema({
    userId:{type:String,required:true},
    categoryId:{type:String,required:true},
    productName:{type:String,required:true},
    productImage:{type:String,required:true},     
},{timestamps:true});

const BrandProductModel = new mongoose.model("BrandProduct",brandProductSchema);

module.exports=BrandProductModel;