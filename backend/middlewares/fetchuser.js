const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWt_secret = process.env.JWT_SECRET;
// const JWt_secret ="armanistheOG@";
console.log(process.env.JWT_SECRET)

// next is used to call the following funtion after this function is called for fetching the user
const fetchuser = (req, res, next) => {
  // get user from jwt token and append id to req object
  const token = req.header("auth-token");
//   this auth-token is used in headers as a name to decode auth token
  if (!token) {
    res.status(401).json("please enter a valid authentication token");
  }
  try {
    const data = jwt.verify(token, JWt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json("please enter a valid authentication token");
  }
};
module.exports = fetchuser;
