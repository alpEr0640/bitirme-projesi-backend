const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const { Register, validateRegister } = require("../Models/registers");

router.post("/", async (req, res, next) => {
  const { name, surname, kimlikNo, password, dogumTrh, telNo } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new Register({
    name,
    surname,
    kimlikNo,
    dogumTrh,
    telNo,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
