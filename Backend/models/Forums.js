const mongoose=require("mongoose")
const privateForumSchema=require('./Schemas/Forum/Private_Forum')
const publicForumSchema=require('./Schemas/Forum/Public_Forum')
const options={discriminatorKey: 'Type'}
const forumSchema= new mongoose.Schema(
    {
        forumName:{
            type: String,
            required: true
        },
        forumDescription:{
            type: String,
            required: true
        },
        associatedInstituteID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Institute',
            required: true
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },options, {timestamps: true}
)
const Forum=mongoose.model('Forum', forumSchema)
const privateForum=Forum.discriminator('Private', privateForumSchema)
const publicForum=Forum.discriminator('Public', publicForumSchema)
module.exports={Forum, privateForum, publicForum}