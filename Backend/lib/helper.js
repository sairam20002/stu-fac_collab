// Add any helper function here
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { Forum } = require("../models/Forums");
exports.getUserId = (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
           throw new Error('No token authorization denied')
        }
        const decoded = jwt.verify(token, config.SECRET_KEY);
        return decoded.sub;
    } catch (err) {
      console.log(err)
      return null
    }
};
//Check if given member is in form or not
exports.isForumMember=(foundForum, userId)=>{
    if(foundForum.members.indexOf(userId)===-1){
      return false
    }else{
      return true
    }  
}