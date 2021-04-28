const mongoose=require("mongoose")
const privateForumSchema= new mongoose.Schema(
    {
        members:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        memberLimit:{
            type: Number,
            default: 250
        }
    }
)
module.exports=privateForumSchema