const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error");
const {
  Register,
  validateRegister,
  validateLogin,
} = require("../Models/registers");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
router.get("/", async (req, res,) => {
  const Rgs = await Register.find();
  res.send(Rgs);
})

router.get("/:kimlikNo", async (req, res) => {
  const user = await Register.findOne({ kimlikNo: req.params.kimlikNo });
  if (!user) {
    return res.status(404).send("aradığınız kullanıcı Bulunamadı");
  }
  res.send(user);
});


router.post("/create", async (req, res, next) => {
  const { error } = validateRegister(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await Register.findOne({ kimlikNo: req.body.kimlikNo });

  if (user) {
    return res
      .status(400)
      .send("bu kimlik nmarası zaten bir kullanıcı mevcut.");
  }

  const birthDate = new Date(req.body.dogumTrh);
  const age = calculateAge(birthDate);

  
  // Yaş kontrolü yap
  if (age < 18) {
    return res.status(400).send("Kullanıcı 18 yaşından küçük olamaz.");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  register = new Register({
    name: req.body.name,
    surname: req.body.surname,
    kimlikNo: req.body.kimlikNo,
    dogumTrh: req.body.dogumTrh,
    telNo: req.body.telNo,
    password: hashedPassword,
  });
  await register.save();

  const token = register.createAuthToken();

  res.header("x-auth-token", token).send(register);
});
function calculateAge(birthDate) {
  const today = new Date();
  const diff = today - birthDate;
  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  

router.post("/auth", async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let register = await Register.findOne({ kimlikNo: req.body.kimlikNo });
  if (!register) {
    return res.status(400).send("hatalı email ya da parolas");
  }

  const isSuccess = await bcrypt.compare(req.body.password, register.password);
  if (!isSuccess) {
    return res.status(400).send("hatalı email ya da parolalar");
  }
  else {
  }

  /* const token = register.createAuthToken();
*/
  res.json({
    token: register.createAuthToken()
  })
});

module.exports = router;
