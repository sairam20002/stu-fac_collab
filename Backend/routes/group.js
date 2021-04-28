const express=require("express")
const router=express.Router();
const {createGroup, getGroupById, getAllGroupsOfAnInstitute, assignMultpleUsersToGroup, getUsersByGroup}=require('../controllers/groups')
const {isAdmin, requireAuth}=require('../middleware/auth-middleware')
/*===========================
    POST Routes Goes Here
=============================*/
/*
    @Route  POST /api/group
    @Desc   For College Admin to add Group
    @Access Private
*/
router.post('/',[requireAuth, isAdmin], createGroup)

/*
    @Route  POST /api/group/user
    @Desc   For College Admin to add Group
    @Access Private
*/
router.post('/user',[requireAuth, isAdmin], assignMultpleUsersToGroup)

/*===========================
    GET Routes Goes Here
=============================*/
/*
    @Route  GET /api/group/user
    @Desc   For College Admin to view users of a Group
    @Access Private
*/
router.get('/user',[requireAuth, isAdmin], getUsersByGroup)
/*
    @Route  GET /api/group
    @Desc   For College Admin to view all Groups
    @Access Private
*/
router.get('/',[requireAuth, isAdmin], getAllGroupsOfAnInstitute)
/*
    @Route  GET /api/group/:id
    @Desc   For College Admin to view group by id
    @Access Private
*/
router.get('/:id',[requireAuth, isAdmin], getGroupById)
module.exports=router