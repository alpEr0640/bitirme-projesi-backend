const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fs = require("fs");
const { vtr, validateVoterList } = require("../Models/voterList");
const path = require("path");

router.get("/", async (req, res) => {
  const voter = await vtr.find();
  res.send(voter);
});

router.post("/", async (req, res) => {
  try {
    const filePaths = req.body.filePaths;
    const fileName = req.body.fileName;
     const filePath = path.join(filePaths,fileName);
    let cityData = fs.readFileSync(filePath);
    let cities = JSON.parse(cityData);

    await vtr.create(cities);

    console.log("Data successfully imported");
    res.status(201).send("Data successfully imported");
  } catch (error) {
    console.log("Error importing data:", error);
    res.status(404).send("Internal Server Error");
  }
});
router.delete("/:id", async (req, res) => {
  const result = await vtr.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
