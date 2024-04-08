const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error.js"); ;

const verifyToken = (req, res, next) => {
  return jwt.sign({ _id: this.id }, process.env.JWT_SECRET);
  
};


module.exports = verifyToken;
