const moongoose=require("mongoose");

const sparePartSchema= new moongoose.Schema({
    userId:{type:String,required:true},
    productId:{type:String,required:true},
    MRP:{type:Number,required:true},
    bestPrice:{type:Number,required:true},
    description:{type:String,required:true},
    partName:{type:String,required:true},
    productModel:{type:String,required:true},
    faultType:{type:Array,required:true},
    images:{type:Array,required:true},
},{timestamps:true});

const sparePartModel=new moongoose.model("sparePart",sparePartSchema);

module.exports=sparePartModel;