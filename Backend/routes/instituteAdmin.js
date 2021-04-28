const express=require("express");
const { getUsersOfAdminInstitute } = require("../controllers/user");
const router=express.Router();
const {isAdmin, requireAuth}=require('../middleware/auth-middleware')
/*===========================
    GET Routes Goes Here
=============================*/
/*
    @Route  GET /api/admin/user
    @Desc   For  Admin to view all users
    @Access Private
*/
router.get('/user',[requireAuth,isAdmin], getUsersOfAdminInstitute)

module.exports=router