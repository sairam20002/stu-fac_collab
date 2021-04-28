const mongoose=require("mongoose")
const postsSchema= new mongoose.Schema(
    {
        postName:{
            type: String,
            required: true
        },
        postDescription:{
            type: String,
            required: true
        },
        postImage:{
            //Add Image Functionality Later
        },
        postUpvotes:{
            type: Number,
            default: 0
        },
        postDownvotes:{
            type: Number,
            default: 0
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        parentForum:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Forum'
        }
    }, {timestamps: true}
)
const Post=mongoose.model('Post', postsSchema)
module.exports={Post}