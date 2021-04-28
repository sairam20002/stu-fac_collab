const jwt = require("jsonwebtoken");
const SECRET_TOKEN_KEY = require("../config/config").SECRET_KEY;
const issueJWT = (user) => {
    const expiresIn = "1d";
    const payload = {
      sub: user._id,
      iat: Date.now(),
    };
    const signedToken = jwt.sign(payload, SECRET_TOKEN_KEY, {
      expiresIn: expiresIn,
    });
    return {
      //This is Bearer Token
      token: signedToken,
      expires: expiresIn,
    };
  };
module.exports = {
    issueJWT
};
  