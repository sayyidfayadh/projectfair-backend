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
      res.status(201).json(newUser)
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
exports.updateProfile=async(req,res)=>{
  const{profile,github,linkedin}=req.body
  const userId=req.payload
  const newProfile=req.file?req.file.filename:profile
  try {
    const updateProfile=await users.findByIdAndUpdate(userId,{
      profile:newProfile,github,linkedin
    },{new:true})
    await updateProfile.save()
    res.status(200).json(updateProfile)
    
  } catch (error) {
    res.status(401).json(error)
  }
}
//get pdata
exports.getProfile=async(req,res)=>{
  const userId=req.payload;
  // console.log(userId);
  
  try {
    const existingProfileData=await users.findOne({_id:userId}).select(`-password`)
    res.status(200).json(existingProfileData)
    console.log(existingProfileData);

    
    } catch (error) {
      res.status(401).json(error)
    
  }
  
}