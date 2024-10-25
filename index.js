//load .env file into process.env by defaualt
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const pfServer=express()
const router=require('./Router/router')
require('./DB/connection')
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/upload',express.static('./upload'))
const PORT=3000

pfServer.listen(PORT,()=>{
  console.log(`pfserver started running at port ${PORT}`);
  
})
pfServer.get('/',(req,res)=>{
  res.status(200).send('<h1 style="color:red">Project Fair server started running and waiting for client request</h1>')
})
