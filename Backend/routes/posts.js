//POST API IS NOT REST
const express=require("express")
const router=express.Router()
const {createPost, viewPostsofAForum, getPostCreatedByLoggedInUser}=require('../controllers/posts')
const {requireAuth}=require('../middleware/auth-middleware')

/*===========================
    GET Routes Goes Here
=============================*/
/*
    @Route  GET /api/post
    @Desc   For Logged in user's all post
    @Access Private
*/
router.get('/', [requireAuth], getPostCreatedByLoggedInUser)
/*
    @Route  GET /api/post/forum
    @Desc   For Logged in user's all post
    @Access Private
*/
router.get('/forum', [requireAuth], viewPostsofAForum)
/*===========================
    POST Routes Goes Here
=============================*/
/*
    @Route  POST /api/post
    @Desc   For Logged in user to add a post
    @Access Private
*/
router.post('/', [requireAuth], createPost)

module.exports=router