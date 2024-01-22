const express = require("express");
const router = express.Router();
const { Register, validateRegister } = require("../Models/registers");

router.get("/", async (req, res) => {
  const Rgs = await Register.find();
  res.send(Rgs);
});
router.get("/:id", async (req, res) => {
  const Rgs = await Register.findById({ _id: req.params.id });
  if (!Rgs) {
    return res.status(404).send("aradığınız kullanıcı Bulunamadı");
  }
  res.send(Rgs);
});

router.post("/", async (req, res) => {
  const Result = validateRegister(req.body);
  if (Result.error) {
    return res.status(200).send(Result.error.details[0].message);
  }
  const Rgs = new Register({
    name: req.body.name,
    surname: req.body.surname,
    kimlikNo: req.body.kimlikNo,
    password: req.body.password,
    dogumTrh: req.body.dogumTrh,
    telNo: req.body.telNo,
  });
  try {
    const result = await Rgs.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const kimlik = req.body.kimlikNo;
  const Rgs = await Register.findById(
    { _kimlikNo: kimlik },
    { projection: { _id: 0, name: 1, kimlikno: 1 } }
  );
  res.send(Rgs);
});
router.put("/:id", async (req, res) => {
  const Rgs = await Register.findById({ _id: req.params.id });
  Rgs.name = req.body.name;
  Rgs.surname = req.body.surname;
  Rgs.kimlikNo = req.body.kimlikNo;
  Rgs.dogumTrh = req.body.dogumTrh;
  Rgs.telNo = req.body.telNo;

  const updatedRegister = await Rgs.save();
  res.send(updatedRegister);
});

router.delete("/:id", async (req, res) => {
  const result = await Register.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
