const jwt = require("jsonwebtoken");
const { Register } = require("../Models/registers");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Token yok. Yetkilendirme reddedildi.");

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = await Register.findById(decoded._id);
    next();
  } catch (ex) {
    res.status(400).send("Geçersiz token.");
  }
};
