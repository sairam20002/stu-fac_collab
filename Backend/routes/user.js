const express=require("express")
const router=express.Router();
const {getUserByUsername, getAllLoggedInInstituteUser}=require("../controllers/user")
const {requireAuth}=require('../middleware/auth-middleware')
/*
    @Route  GET /api/user
    @Desc   To view a particular user by username
    @Access Private
*/
router.get("/",[requireAuth], getUserByUsername)
/*
    @Route  GET /api/user/all
    @Desc   To view all users associated with the logged in user
    @Access Private
*/
router.get('/all', [requireAuth], getAllLoggedInInstituteUser)
module.exports=router