const projects = require("../Models/projectSchema")
const project=require("../Models/projectSchema")
// add project
exports.addProject=async (req,res)=>{
  // console.log("inside add project");
  const{title,language,github,website,overview}=req.body
  const projectImage=req.file.filename
  const userId=req.payload
  console.log(title,language,github,website,overview,projectImage,userId);
  
  try {
    const existingProject=await project.findOne({github})
    if(existingProject){
      res.status(404).json("project matchng the github repostery already exist")
    }
    else{
      const newProject=new project({title,language,github,website,overview,projectImage,userId})
      await newProject.save()
      res.status(200).json(newProject +"s")
    }
  } catch (error) {
    res.status(401).json(error)
  }
  // res.status(200).json("add project request received")
}
//getMarqueeProjects
exports.getHomeProjects=async (req,res)=>{
  
  try {
    const allProjects=await project.find().limit(3)
    res.status(200).json(allProjects)
    
  } catch (error) {
    res.status(401).json(error)
  }
}
//getAllUserProjects
exports.getAllUserProjects=async(req,res)=>{
  // console.log("controller start");
  
  const userid=req.payload
  try {
    // console.log("User ID: ", userid);
    const allUserProjects = await project.find({ userId: userid });
    res.status(200).json(allUserProjects)
    // console.log("inside the getalluserpro controler");
    
  } catch (error) {
    res.status(401).json(error)
  }
}
//getAllProjects
exports.getAllProjects=async(req,res)=>{
  const searchKey=req.query.search
  const query={
    language:{
      $regex:searchKey,$options:"i"
    }
}
  try {
    console.log("inside getall");
    const allProjects=await project.find(query)
    res.status(200).json(allProjects)
  } catch (error) {
    res.status(401).json(error)
  }
}
//editproject
exports.editUserProject=async(req,res)=>{
  const{title,language,github,website,overview,projectImage}=req.body
  const uploadImage=req.file?req.file.filename:projectImage
  const userId=req.payload
  const{pid}=req.params
  try {
    const updateProject=await project.findByIdAndUpdate({_id:pid},{
      title,language,github,website,overview,projectImage:uploadImage,userId
    },{new:true})
    await updateProject.save()
    res.status(200).json(updateProject)
  } catch (error) {
    res.status(401).json(error)
   
  }
}
//delete projects\\\

exports.deleteProject=async(req,res)=>{
const {pid}=req.params
try {
  const deleteProject=await project.findByIdAndDelete({_id:pid})
  res.status(200).json(deleteProject)
} catch (error) {
  res.status(401).json(error)
}
log]
}