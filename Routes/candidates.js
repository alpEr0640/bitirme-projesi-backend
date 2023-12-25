const express = require("express");
const router = express.Router();
const { Candidate, validateCandidate } = require("../Models/candidates");

router.get("/", async (req, res) => {
  const candidate = await Candidate.find();
  res.send(candidate);
});

router.get("/:id", async (req, res) => {
  const candidate = await Candidate.findById({ _id: req.params.id }); //id ile arama değil tc ile aramaya dönüştür UNUTMA !!
  if (!candidate) {
    return res.status(404).send("aradığınız kullanıcı Bulunamadı");
  }
  res.send(candidate);
});

router.post("/", async (req, res) => {
  const Cndt = new Candidate({
    name: req.body.name,
    surname: req.body.surname,
    elections: req.body.elections,
  });
  try {
    const result = await Cndt.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  const candidate = await Candidate.findById({ _id: req.params.id });
  candidate.name = req.body.name;
  candidate.surname = req.body.surname;

  const updatedCandidate = await candidate.save();
  res.send(updatedCandidate);
});

router.delete("/:id", async (req, res) => {
  const result = await Candidate.deleteOne({ _id: req.params.id });
  res.send(result);
});
module.exports = router;
