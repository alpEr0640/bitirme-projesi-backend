const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ancmt, validateAnnouncement } = require("../Models/Announcements");

router.get("/", async (req, res) => {
  const announcement = await ancmt.find();
  res.send(announcement);
});

router.get("/:id", async (req, res) => {
  const announcemet = await ancmt.findById({ _id: req.params.id });
  if (!announcemet) {
    return res.status(404).send("aradığınız duyuru bulunamadı");
  }
  res.send(announcemet);
});

router.post("/", async (req, res) => {
  const result = validateAnnouncement(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  const announcement = new ancmt({
    announcementTitle: req.body.announcementTitle,
    announcementBody: req.body.announcementBody,
  });
    try {
        const result = await announcement.save();
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});
router.put("/:id", async (req, res) => {
    const announcement = await ancmt.findById({ _id: req.params.id });
    announcement.announcentTitle = req.body.announcentTitle,
        announcement.announcementBody = req.body.announcementBody
    const updatedAnnouncement = await announcement.save();
    res.send(updatedAnnouncement);
});

router.delete("/:id", async (req, res) => {
    const result = await ancmt.deleteOne({ _id: req.params.id });
    res.send(result)
})

module.exports = router;