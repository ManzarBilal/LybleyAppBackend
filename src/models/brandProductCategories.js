const mongoose=require("mongoose");

const brandCategorySchema= new mongoose.Schema({
    categoryName:{type:String,required:true},
    categoryImage:{type:String,required:true},
    status:{type:String,default:"INACTIVE"},
     
},{timestamps:true});

const BrandCategoryModel = new mongoose.model("ProductCategory",brandCategorySchema);

module.exports=BrandCategoryModel;