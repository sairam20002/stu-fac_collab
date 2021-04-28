const { getUserId } = require("../lib/helper")
const Group=require("../models/Groups")
const { User } = require("../models/User")
//Admin Only Access

/*=======================
    To Create a new group
=========================*/
exports.createGroup=async (req, res)=>{
    //Let all data be passed into req.decoded
    try{
        req._id=getUserId(req, res)
        const foundUser=await User.findById(req._id)
        //Middleware already checks that foundUser is Admin
        const groupInfo={
            groupName: req.body.groupName,
            groupDescription: req.body.groupDescription,
            associatedInstituteID: foundUser.instituteID
        }
        const newGroup= new Group(groupInfo)
        await newGroup.save()
        return res.status(200).json({message: 'Group added successfully'})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server Error', err: err.message})
    }
}
/*=======================
    To get a group by ID
=========================*/
exports.getGroupById= async (req, res)=>{
    try{
        const foundGroup=await Group.findById(req.params.id)
        return res.status(200).json({message: 'Sucess', group: foundGroup})
    }catch(err){
        return res.status(500).json({message: 'Server Error', err: err.message})
    }
}
/*======================================
    To get groups of Admin's Institute
========================================*/
exports.getAllGroupsOfAnInstitute=async(req, res)=>{
    try{
        req._id=getUserId(req, res)
        const foundUser=await User.findById(req._id)
        //Must be admin only
        const foundGroups= await Group.find({associatedInstituteID: foundUser.instituteID})
        return res.status(200).json({message: 'Success', groups: foundGroups})
    }catch(err){
        return res.status(500).json({message: 'Server Error', err: err.message})
    }
}
/*=====================================
    To assign array of users a group
=======================================*/
exports.assignMultpleUsersToGroup=async(req, res)=>{
    const {userids, groupName}=req.body
    try{
        const foundGroup= await Group.findOne({groupName: groupName})
        if(!foundGroup){
            throw new Error('No group by the group name Found')
        }
        let unmatchedUsers=[]
        for (const userid of userids) {
            let foundUser=await User.findById(userid)
            //If Found user's institute and group's institute are of same institute
            console.log(`Found user institute id ${foundUser.instituteID}, found group asssociated institute id is ${foundGroup.associatedInstituteID}`)
            if(foundUser.instituteID.equals(foundGroup.associatedInstituteID)){
                if(foundUser.groupsEnrolled.indexOf(foundGroup._id)===-1){
                    foundGroup.members.push(foundUser._id)
                    foundUser.groupsEnrolled.push(foundGroup._id)
                }else{
                    unmatchedUsers.push(foundUser)
                }
            }else{
                unmatchedUsers.push(foundUser)
            }
            await foundUser.save()
        }
        await foundGroup.save()
        return res.status(200).json({message: 'Success, users added succes',skippedUsers: unmatchedUsers})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server Error',err: err.message})
    }
}
/*============================================
    To Remove an array of students from group
==============================================*/
exports.removeGroupFromUser=async (req, res)=>{
    const {usernames, groupName}=req.body
    try{
        const foundGroup= await Group.findOne({groupName: groupName})
        for (const username of usernames) {
            const foundUser=await User.findById(username)
            foundUser.groupsEnrolled.splice(foundUser.groupsEnrolled.indexOf(foundGroup._id))
            foundGroup.associatedInstituteID.splice(foundGroup.associatedInstituteID.indexOf(foundUser._id))
        }
        await foundUser.save()
        await foundGroup.save()
        return res.status(200).json({message: 'Success, users added succes',skippedUsers: unmatchedUsers})
    }catch(err){
        return res.status(500).json({message: 'Server Error',err: err.message})
    }
}
/*==============================
    To Get users from a group
===============================*/
exports.getUsersByGroup=async (req, res)=>{
    const groupName=req.query.groupName
    try{
        const foundGroup= await Group.findOne({groupName: groupName})
        console.log(foundGroup)
        if(!foundGroup){
           throw new Error('No group found')
        }
        let users=[]
        for (const member of foundGroup.members) {
            console.log(member)
            let foundUser=await User.findById(member._id)
            users.push(foundUser)
        }
        return res.status(200).json({message: 'Success, found users are', users: users})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error', err: err.message})
    }
}