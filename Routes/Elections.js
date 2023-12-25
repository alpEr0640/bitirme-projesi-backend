const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Elc, validateElection } = require("../Models/elections");

router.get("/", async (req, res) => {
  const election = await Elc.find().populate("electionType").populate("candidateId")
  res.send(election);
});

router.get("/:id", async (req, res) => {
  const election = await Elc.findById({ _id: req.params.id });
  if (!election) {
    return res.status(404).send("aradığınız seçim bulunamadı");
  }
  res.send(election);
});

router.post("/", async (req, res) => {
  const election = new Elc({
    initDate: req.body.initDate,
    electionType: req.body.electionType,
    candidateId:req.body.candidateId,
  });
  try {
    const result = await election.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
