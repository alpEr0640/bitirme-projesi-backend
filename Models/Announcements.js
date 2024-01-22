const mongoose = require("mongoose");
const joi = require("joi");

const announcementSchema = mongoose.Schema({
    announcementTitle: String,
    announcementBody: String,
});
function validateAnnouncement(announcement) {
    const schema = new joi.object({
        announcementTitle: joi.string().required(),
        announcementBody: joi.string().required(),
    })
    return schema.validate(announcement);
}

const ancmt = mongoose.model("announcement", announcementSchema);
module.exports = { ancmt, validateAnnouncement };