const express=require("express")
const router=express.Router();
const {addInstitute, assignAdmin, getAllInstitutes, getInstituteById, getAllInstituteAdmins}=require('../controllers/institute')
const {isSuperAdmin, requireAuth}=require('../middleware/auth-middleware')
/*===========================
    POST Routes Goes Here
=============================*/
/*
    @Route  POST /api/institute/add
    @Desc   For Super Admin to add institutes
    @Access Private
*/
router.post('/add',[requireAuth,isSuperAdmin], addInstitute)
/*
    @Route  POST /api/institute/assignadmin
    @Desc   For Super Admin to assign a institute Admin
    @Access Private
*/
router.post('/assignadmin', [requireAuth,isSuperAdmin], assignAdmin)
/*========================
    GET Routes Goes Here
==========================*/
/*
    @Route  GET /api/institute
    @Desc   For Super Admin to view all institutes
    @Access Private
*/

router.get('/',[requireAuth,isSuperAdmin], getAllInstitutes)
/*
    @Route  GET /api/institute/admin
    @Desc   For Super Admin to view all institute admins
    @Access Private
*/
router.get('/admin',[requireAuth,isSuperAdmin],getAllInstituteAdmins )

/*
    @Route  GET /api/institute/:id
    @Desc   For Super Admin to view institute by ID
    @Access Public
*/
router.get('/:id', getInstituteById)


module.exports=router