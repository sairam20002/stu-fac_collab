const { getUserId, isForumMember } = require('../lib/helper')
const {Post}=require('../models/Posts')
const {Forum}=require('../models/Forums')
const { User } = require('../models/User')
exports.createPost= async (req, res)=>{
    try{
        req._id=getUserId(req, res)
        const {postName, postDescription, parentForumId}=req.body
        const foundForum=await Forum.findById(parentForumId)
        const foundUser= await User.findById(req._id)
        if(!foundForum){
            throw new Error('Forum Not Found')
        }
        if(!foundForum.associatedInstituteID.equals(foundUser.instituteID)){
            throw new Error('Institute is not valid')
        }
        if(foundForum.Type==='Private'){
            if(foundForum.members.indexOf(req._id)===-1){
                throw new Error('Not Member of the private forum')
            }
        }
        const newPost = new Post({postName: postName, postDescription: postDescription, createdBy: req._id, parentForum: parentForumId})
        await newPost.save()
        return res.status(200).json({message: 'Post Added', newPost})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server Error', err: err.message})
    }
}
//View all posts of the forum
exports.viewPostsofAForum= async(req, res)=>{
    try{
        req._id=getUserId(req, res)
        const {forumId}=req.query
        const foundForum=await Forum.findById(forumId)
        const foundUser= await User.findById(req._id)
        if(!foundForum){
            throw new Error('Forum Not Found')
        }
        if(!foundForum.associatedInstituteID.equals(foundUser.instituteID)){
            throw new Error('Institute is not valid')
        }
        if(foundForum.Type==='Private'){
            if(foundForum.members.indexOf(req._id)===-1){
                throw new Error('Not Member of the private forum')
            }
        }
        const foundPosts=await Post.find({parentForum: forumId})
        return res.status(200).json({message: 'Found Posts', foundPosts: foundPosts})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server Error', err: err.message})
    }
}
exports.getPostCreatedByLoggedInUser= async(req, res)=>{
    try{
        req._id=getUserId(req, res)
        const foundPosts= await Post.find({createdBy: req._id}).populate('parentForum')
        return res.status(200).json({message: 'Found Posts are', foundPosts: foundPosts})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server Error', err: err.message})
    }
}
//Implement Later when will decide the REST API Design
// exports.getPostById= async(req, res)=>{
//     try{

//     }catch{

//     }
// }