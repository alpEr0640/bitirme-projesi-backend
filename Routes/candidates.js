const express = require("express");
const router = express.Router();
const { Candidate, validateCandidate } = require("../Models/candidates");

const { Register } = require("../Models/registers");

router.get("/", async (req, res) => {
  const result = await Candidate.find().populate("candidateId");
  res.send(result);
});

router.get("/:kimlikNo", async (req, res) => {
  try {
    const candidate = await Candidate.findOne({
      candidateId: {
        $in: await Register.find({ kimlikNo: req.params.kimlikNo }).distinct(
          "_id"
        ),
      },
    }).populate("candidateId");

    if (!candidate) {
      return res.status(404).send("Aradığınız kullanıcı bulunamadı");
    }

    res.send(candidate);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Sunucu hatası");
  }
});

router.post("/", async (req, res) => {
  const Cndt = new Candidate({
    candidateId: req.body.candidateId,
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
