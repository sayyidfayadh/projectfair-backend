const mongoose=require('mongoose')
const connectionString=process.env.connectionString
mongoose.connect(connectionString).then(()=>{
  console.log('mongoDb atlas succesfully connected to server');
  
}).catch((err)=>{
  console.log("mongodb connection failed",err);
  
})