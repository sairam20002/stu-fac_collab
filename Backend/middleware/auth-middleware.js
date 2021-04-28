const jwt= require('jsonwebtoken')
const {getUserId}=require('../lib/helper');
const { User } = require('../models/User');
exports.requireAuth= (req, res, next)=>{
    // const token=req.cookies.jwt
    // //check jwt exists or not
    // if(token){
    //     jwt.verify(token, process.env.jwtSecret, (err, decoded)=>{
    //         if(err){
    //             res.status(500).json({message : "Server Error"})
    //         }else{
    //             console.log('Decoded object from jwt is (middleware)')
    //             console.log(decoded)
    //             next()
    //         }
    //     })
    // }else{
    //     res.status(404).json({message : "token not found"})
    // }
    try {
        const token = req.header("x-auth-token");
        if (!token) {
        //   console.log("No token authorization denied");
           throw new Error('No token authorization denied')
        }
        next()
    } catch (err) {
      console.log(err)
      return res.status(404).json({message : "token not found", err: err.message})
    }
}
exports.isAdmin = async (req, res, next)=>{
  try{
    req._id=getUserId(req, res)
    const foundUser=await User.findById(req._id)
    if(!foundUser||foundUser.Type!=='Admin'){
      throw new Error('Not an admin')
    }
    next()
  }catch(err){
    console.log(err)
    return res.status(404).json({message : "User is not an Admin"})
  }
}
exports.isFaculty = async (req, res, next)=>{
  try{
    req._id=getUserId(req, res)
    const foundUser=await User.findById(req._id)
    if(!foundUser||foundUser.Type!=='Faculty'){
      throw new Error('Not a faculty')
    }
    next()
  }catch(err){
    console.log(err)
    return res.status(404).json({message : "User is not a Faculty"})
  }
}
exports.isStudent = async (req, res, next)=>{
  try{
    req._id=getUserId(req, res)
    const foundUser=await User.findById(req._id)
    if(!foundUser||foundUser.Type!=='Student'){
      throw new Error('Not a Student')
    }
    next()
  }catch(err){
    console.log(err)
    return res.status(404).json({message : "User is not a Student"})
  }
}
exports.isSuperAdmin = async (req, res, next)=>{
  try{
    req._id=getUserId(req, res)
    const foundUser=await User.findById(req._id)
    if(!foundUser||foundUser.Type!=='Super Admin'){
      throw new Error('Not a Super Admin')
    }
    next()
  }catch(err){
    console.log(err)
    return res.status(404).json({message : "User is not a Super Admin"})
  }
}