const express=require("express")
const router=express.Router()
const {createForum, getAllForumsofLoggedInUser, getAllForumOfAUser, getForumByForumName, addUsersToPvtForum}=require('../controllers/forms')
const {isAdmin, requireAuth}=require('../middleware/auth-middleware')
const {isForumOwner}=require('../middleware/forum-middleware')
/*===========================
    GET Routes Goes Here
=============================*/
/*
    @Route  GET /api/forum/
    @Desc   To view forum by forum name
    @Access Private
*/
router.get('/', [requireAuth], getForumByForumName)
/*
    @Route  GET /api/forum/user
    @Desc   To view all forums a logged in user
    @Access Private
*/
router.get('/user', [requireAuth], getAllForumsofLoggedInUser)
/*
    @Route  GET /api/forum/user/:id
    @Desc   To view all forums of a user
    @Access Private
*/
router.get('/user/:id', [isAdmin,requireAuth], getAllForumOfAUser)
/*===========================
    POST Routes Goes Here
=============================*/
/*
    @Route  POST /api/forum
    @Desc   To add forums to the institute
    @Access Private
*/
router.post('/', [requireAuth], createForum)
/*
    @Route  POST /api/forum/user
    @Desc   To add users to the forum
    @Access Private
*/
router.put('/user', [requireAuth, isForumOwner], addUsersToPvtForum)
module.exports=router