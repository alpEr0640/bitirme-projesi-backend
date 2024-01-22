const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");
const { Register, validateRegister } = require("../Models/registers");
router.post("/", async (req, res, next) => {
  const { password, kimlikNo } = req.body;
  try {
    const validUser = await Register.findOne({ kimlikNo });
    if (!validUser) return next(errorHandler(404, "Kullanıcı Adı Yanlış!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Yanlış Şifre!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .send(validUser)
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
