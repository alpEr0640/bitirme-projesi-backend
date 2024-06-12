const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { spcElec, validateSpecialElection } = require("../Models/specialElection");

router.get("/", async (req, res) => {
    const special = await spcElec.find();
    res.send(special);
})

router.post("/", async (req, res) => {
    const result = validateSpecialElection(req.body);
    if (result.error) {
        return res.status(404).send(result.error.details[0].message);
    }
    const special = new spcElec({
        winCondition: req.body.winCondition,
    });
    try {
        const result = await special.save();
        res.send(result);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;