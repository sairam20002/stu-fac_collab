const express=require("express")
const router=express.Router();
const {addSuperUser, addInstituteAdmin}=require('../controllers/superAdmin')
const {isSuperAdmin, requireAuth}=require('../middleware/auth-middleware')
/*===========================
    POST Routes Goes Here
=============================*/
/*
    @Route  POST /api/superuser
    @Desc   For Super Admin to be added
    @Access Private
*/
router.post('/',[requireAuth,isSuperAdmin], addSuperUser)
/*
    @Route  POST /api/superuser/addadmin
    @Desc   For Super Admin to be added
    @Access Private
*/
router.post('/addadmin',[requireAuth, isSuperAdmin],addInstituteAdmin)
module.exports=router