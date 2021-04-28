const Group = require("../models/Groups")
const {User}=require("../models/User")
const {getUserId}=require('../lib/helper')
exports.getUserByUsername=async (req, res)=>{
     User.findOne({username: req.query.username}).then((doc)=>{
        return res.status(200).json(doc)
     }).catch((err)=>{
        return res.status(404).json({message: "Invalid ID"})
     })
}
//To add group to a single user

exports.getUsersOfAdminInstitute= async (req, res)=>{
    const Type= req.query.Type
    req._id=getUserId(req, res)
    try{
        if(!Type){
            throw new Error('Type required')
        }
        const foundAdmin=await User.findById(req._id)
        const foundUsers=await User.find({instituteID: foundAdmin.instituteID, Type: Type})
        return res.status(200).json({message: 'Success', users: foundUsers})
    }catch(err){
        return res.status(500).json({message: 'Server Error', err: err.message})
    }
}
exports.getAllLoggedInInstituteUser= async(req, res)=>{
    req._id=getUserId(req, res)
    try{
        const foundUser= await User.findById(req._id)
        const allUsersOfTheInstitute=await User.find({instituteID: foundUser.instituteID})
        return res.status(200).json({message: 'Success', users:allUsersOfTheInstitute})
    }catch(err){
        return res.status(500).json({message: 'Server Error', err: err.message})
    }
}