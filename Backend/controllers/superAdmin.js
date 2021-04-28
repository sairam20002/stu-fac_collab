const Institute = require('../models/Institute')
const {SuperAdmin, Admin, User}=require('../models/User')
//To add the user to the Database 

//Allows Super User to add Admin
exports.addInstituteAdmin = async (req, res) => {
  const pass=req.body.password
  const confirmpass=req.body.confirmpass
  const instituteName= req.body.instituteName
  if(pass!==confirmpass){
    return res.status(400).json({message: 'Passwords do not match'})
  }else{
      try{
        const foundInstitute= await Institute.findOne({instituteName: instituteName})
        if(!foundInstitute){
            throw new Error('Institute Not Found')
        }
        if(foundInstitute.assignedAdmin&&foundInstitute.assignedAdmin!==null){
          throw new Error('Admin already exists')
        }
        const newAdmin={
            email: req.body.email, 
            password: req.body.password, 
            name: req.body.name,
            gender: req.body.gender,
            username: req.body.username,
            instituteID: foundInstitute._id
        }   
        const admin=new Admin(newAdmin)
        await admin.save()
        return res.status(200).json({message: 'Institute Admin added Success'})
      }catch(err){
          //Handle Errors
          console.log(err)
          //Explain code 11000 here
            if (err.code === 11000) {
                if (err.keyValue.email) {
                    return res.status(500).json({message: 'Email already exists', err: err.message})
                }
            }
            return res.status(500).json({message: 'Server Error', err: err.message})
        } 
    }
}

//Allow superuser to add more super users
exports.addSuperUser=async (req, res)=>{
    try{
        const {username, email, name, password, gender}=req.body
        const superUser={
            username: username,
            email: email,
            name: name,
            gender: gender,
            password: password
        }
        const newSuperUser= new SuperAdmin(superUser)
        await newSuperUser.save()
        return res.status(200).json({message: 'Super User added Success'})
    }catch(err){
        console.log(err)
        return res.status(422).json({message: 'Server Error', err: err.message})
    }
}