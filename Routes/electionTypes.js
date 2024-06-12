const express = require("express");
const router = express.Router();
const { ElcType, validateElectionType } = require("../Models/electionTypes");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/auth");

router.get("/",  async (req, res) => {
    const electionType = await ElcType.find();
    res.send(electionType);
});

router.post("/", async (req, res) => {
    const elcTyp = new ElcType({
        electionType: req.body.electionType,
    });
    try {
        const result = await elcTyp.save();
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
