// path to resolve the clent request 

//1) import requst 
const express = require('express')

   // import controller
   const userController=require('../controller/userController')


   // import project controller
   const projectController =require("../controller/projectController")

   // import jwtmiddleware

   const jwtMiddleware= require("../Middleware/jwtMiddleware")

   // import multer 

   const multerConfig = require('../Middleware/multerMiddleware')


//2) create an object for the class router in express 

const router = new express.Router()

//3) logic for resolving the request
 //syntax-router.httprequest(post,get,put,delete)("path to resolve request",()=>(how to resolve the request (inside controller)))
//a)Register
router.post('/user/register',userController.register)


router.post('/user/login',userController.login)


//add project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProjects)

// get home project
router.get('/projects/home-project',projectController.getHomeProject)

//getall projects
router.get('/projects/all-project', jwtMiddleware,projectController.getAllProjects)

//getuserprojects

router.get('/user/all-project', jwtMiddleware,projectController.getUserProjects)

//edit project

router.put('/project/edit/:id',jwtMiddleware,multerConfig.single("projectimage"),projectController.editUserProject)
 

//delete project 

router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)

//edit profile

router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)


//4) export router
module.exports = router;