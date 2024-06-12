const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  specialElcType,
  validateSpecialElectionType,
} = require("../Models/specialElectionType");

router.get("/", async (req, res) => {
  const special = await specialElcType.find();
  res.send(special);
});

router.post("/", async (req, res) => {
  const result = validateSpecialElectionType(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  const special = new specialElcType({
    electionType: req.body.electionType,
  });
  try {
    const result = await special.save();
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
