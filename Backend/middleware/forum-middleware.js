const {Forum}=require('../models/Forums')
const {getUserId}=require('../lib/helper')
//To check wether you are Owner of the forum
exports.isForumOwner=async (req, res, next)=>{
    try{
        req._id=getUserId(req, res)
        const foundForum = await Forum.findById(req.body.forumId)
        if(foundForum.createdBy.equals(req._id)){
            next()
        }else{
            throw new Error('You are not owner of this forum')
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({message : "Server Error", err: err.message})
    }
}