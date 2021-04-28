const mongoose=require("mongoose")
const InstituteSchema=new mongoose.Schema(
    {
        //Common Entries Goes Here
        instituteName:{
            type: String,
            required: true
        },
        assignedAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        instituteDescription:{
            type: String,
            required: true
        },
        insituteDetails:{
            foundDate:{
                type: Date
            },
            directorEmail:{
                type: String
            },
            about:{
                type: String
            },
            websiteLink:{
                type: String
            }
        }
        
    },{timestamps: true}
)
const Institute=mongoose.model('Institute', InstituteSchema)
module.exports= Institute
