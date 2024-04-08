const express = require("express");
const mongose = require("mongoose");
const router = express.Router();
const fs = require("fs");
const { drct, validateDirectory } = require("../Models/directory");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
router.get("/",  async (req, res) => {
  const picture = await drct.find();
  res.send(picture);
});

router.post("/", [auth, isAdmin], async (req, res) => {
  const result = validateDirectory(req.body);
  if (result.error) {
    return res.status(200).send(result.error.details[0].message);
  }
  const drc = new drct({
    picturePath: req.body.picturePath,
  });
  try {
    const result = await drc.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;