const express=require("express")
const router=express.Router();
const {addUser, userLogin, logout, getLoggedInUser, createInstituteAdmin}=require('../controllers/auth')
const {requireAuth}= require('../middleware/auth-middleware')
/*
    @Route  POST  /api/user/auth/signup
    @Desc   For Users to register
    @Access Public
*/
router.post('/signup', addUser)
/*
    @Route  POST  /api/user/auth/login
    @Desc   For Users to Login
    @Access Public
*/
router.post('/login', userLogin)
/*
    @Route  POST  /api/user/auth/logout
    @Desc   For Users to Logout
    @Access Public
*/
router.post('/logout', requireAuth, logout)
/*
    @Route  GET /api/user/auth/loggedinuser
    @Desc   To get the logged in user details
    @Access Private
*/
router.get('/loggedinuser', requireAuth, getLoggedInUser)

module.exports=router