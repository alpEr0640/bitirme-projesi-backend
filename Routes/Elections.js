const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Elc, validateElection } = require("../Models/elections");
const { Candidate } = require("../Models/candidates");
const { vtr } = require("../Models/voterList");

router.get("/", async (req, res) => {
  const election = await Elc.find()
    .populate({
      path: "candidates",
      populate: {
        path: "candidateId",
        model: "register",
      },
    })
    .populate("electionType").populate("voter");
  res.send(election);
});

router.get("/:id", async (req, res) => {
  const election = await Elc.findById({ _id: req.params.id })
    .populate({
      path: "candidates",
      populate: {
        path: "candidateId",
        model: "register",
      },
    })
    .populate("electionType");
  if (!election) {
    return res.status(404).send("aradığınız seçim bulunamadı");
  }
  res.send(election);
});

router.post("/", async (req, res) => {
  const result = validateElection(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const election = new Elc({
    initDate: req.body.initDate,
    electionTitle: req.body.electionTitle,
    electionExplanation: req.body.electionExplanation,
    electionType: req.body.electionType,
    candidates: req.body.candidates,
    voter:req.body.voter,
  });
  try {
    const result = await election.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  const election = await Elc.findById({ _id: req.params.id });
  (election.initDate = req.body.initDate),
    (election.electionTitle = req.body.electionTitle),
    (election.electionExplanation = req.body.electionExplanation),
    (election.electionType = req.body.electionType),
    (election.candidates = req.body.candidates);
  const updatedElection = await election.save();
  res.send(updatedElection);
});

router.delete("/:id", async (req, res) => {
  const result = await Elc.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
