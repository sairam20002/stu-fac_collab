const mongoose=require("mongoose")
const groupSchema= new mongoose.Schema(
    {
        groupName:{
            type: String,
            unique: true,
            required: true
        },
        groupDescription:{
            type: String,
            required: true
        },
        associatedInstituteID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Institute',
            required: true
        },
        members:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, {timestamps: true}
)
//Add Validation that on group members in the future
const Group=mongoose.model('Group', groupSchema)
module.exports=Group