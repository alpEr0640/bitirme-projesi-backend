const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fs = require("fs");
const { vtr, validateVoterList } = require("../Models/voterList");
const path = require("path");
const { route } = require("./candidates");

router.get("/", async (req, res) => {
  const voter = await vtr.find();
  res.send(voter);
});

router.post("/", async (req, res) => {
  const result = validateVoterList(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const voter = new vtr({
    electionId: req.body.electionId,
    kimlikNo: req.body.kimlikNo,
  });
  try {
    const result = await voter.save();
    res.send(result);
  } catch (error) {
    console.log("Error importing data:", error);
    res.status(404).send("Internal Server Error");
  }
});

router.put("/:kimlikNo", async (req, res) => {
  const voter = await vtr.findOne({ kimlikNo: req.params.kimlikNo });
  voter.isVoted = true;
  const updatedVoter = await voter.save();
res.send(updatedVoter);
})

router.delete("/all", async (req, res) => {
  const result = await vtr.deleteMany();
  res.send("başarılı");
})


router.delete("/:id", async (req, res) => {
  const result = await vtr.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
