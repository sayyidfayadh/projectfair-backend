const users=require('../Models/userSchema')
const jwt=require("jsonwebtoken");
exports.register=async (req,res)=>{
  const{username,email,password}=req.body
  // console.log(username,email,password);
  try {
    const existingUser=await users.findOne({email})
    console.log(existingUser);
    if(existingUser){
      res.status(406).json("user already exists,please login")
    }
    else{
      const newUser=new users({
        username,email,password,github:"",linkedin:"",profile:""
      })
      await newUser.save()
      res.status(200).json(newUser)
    }
    
  } catch (error) {
    res.status(401).json(error)
  }
  
 
}


exports.login=async (req,res)=>{
  console.log("inside login");
  
  const{email,password}=req.body
  // console.log(username,email,password);
  try {
    const existingUser=await users.findOne({email,password})
    console.log(existingUser);
    if(existingUser){
      //generate token
      const token=jwt.sign({userId:existingUser._id},process.env.jwt_secret)
      res.status(200).json({existingUser,token})
    }
    else{
     res.status(406).json("invalid email or password")
      }
    
  } catch (error) {
    res.status(401).json(error)
  }
  
 
}