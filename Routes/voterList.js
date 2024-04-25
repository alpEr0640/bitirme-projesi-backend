const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fs = require("fs");
const { vtr, validateVoterList } = require("../Models/voterList");

router.get("/", async (req, res) => {
  const voter = await vtr.find();
  res.send(voter);
});

router.post("/", async (req, res) => {
  try {
    const fileName = req.body.fileName;
    // JSON dosyasını oku
    let cityData = fs.readFileSync(fileName);
    let cities = JSON.parse(cityData);

    // MongoDB koleksiyonuna veriyi ekle
    await vtr.create(cities);

    console.log("Data successfully imported");
    res.status(201).send("Data successfully imported");
  } catch (error) {
    console.log("Error importing data:", error);
    res.status(404).send("Internal Server Error");
  }
});
router.delete("/", async (req, res) => {
  const result = await vtr.deleteMany();
  res.send(result);
});

module.exports = router;
