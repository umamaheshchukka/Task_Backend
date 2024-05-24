const Redings=require("../models/redings")
const readingsCtlr={}
function generateData() {
    const temp = (Math.random() * (35 - 25) + 25).toFixed(0)
    const humidity = (Math.random() * (80 - 60) + 60).toFixed(0)
    return {
        temp: parseFloat(temp ),
        humidity: parseFloat(humidity),
    };
}

function startDataInsertion(io) {
    setInterval(async () => {
        const data = generateData()
        const redings=new Redings(data)
        try {
          const response=await redings.save()
           console.log(response,'respo')
           io.emit('newReading',response)
        } catch (error) {
            console.error('Error inserting data:', error)
        }
    },120000)
}
readingsCtlr.list=async(req,res)=>{
    try{
        const response=await Redings.find()
        res.status(201).json(response)
    }catch(err){
        console.log(err)
        res.status(501).json(err)
    }
}
module.exports={readingsCtlr,startDataInsertion}