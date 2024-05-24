const mongoose=require("mongoose")
const {startDataInsertion}=require('../app/controllers/redingsctlr')
const configDb=async(io)=>{
    try{
        const db= mongoose.connect('mongodb://127.0.0.1:27017/project-task')
        startDataInsertion(io)
        console.log('connected to db')
    }catch(err){
        console.log('error in connecting')
    }
   
    
}
module.exports=configDb