require('dotenv').config();
module.exports={
    SECRET_KEY: process.env.jwtSecret,
    superAdminTestToken: process.env.superAdminTestToken
}