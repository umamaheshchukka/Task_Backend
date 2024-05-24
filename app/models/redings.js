const mongoose=require("mongoose")
const{Schema,model}=mongoose
const redingsSchema=new Schema({
    temp:Number,
    humidity:Number
},{timestamps:true})
const Redings=model("Redings",redingsSchema)
module.exports=Redings