const express=require('express')
const router=express.Router()
const userController=require('../Controller/userController')
const projectController=require('../Controller/projectController')
const jwtMiddleware=require('../Middleware/jwtMiddleware')
const multerConfig=require("../Middleware/multerMiddleware")
//register
router.post('/register',userController.register)
//login
router.post('/login',userController.login)
//addproject
router.post('/addproject',jwtMiddleware,multerConfig.single('projectImage'), projectController.addProject)

// get projects to homemarqueee
router.get('/homeprojects',projectController.getHomeProjects)
//get user projects in dashboard

router.get('/userprojects',jwtMiddleware,projectController.getAllUserProjects)
//get all projects in explore

router.get('/allprojects',jwtMiddleware,projectController.getAllProjects)

//editproject
//router spcifc middleware
router.put('/projects/edit/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)
//deleteproject
router.delete('/projects/delete/:pid',jwtMiddleware,projectController.deleteProject)
// get profile data
router.get('/profileData',jwtMiddleware,userController.getProfile)

//update profile
router.put('/updateProfile',jwtMiddleware,multerConfig.single('profile'),userController.updateProfile)

module.exports=router