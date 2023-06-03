const mongoose=require("mongoose");

const brandTransactionSchema=new mongoose.Schema({
    brandId:{type:String},
    totalPay:{type:Number},
    totalDue:{type:Number},
},{timestamps:true})

const TransactionModel=new mongoose.model("brandTransaction",brandTransactionSchema);

module.exports=TransactionModel;