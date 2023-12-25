const mongoose = require("mongoose");
const joi = require("joi");

const specialElectionSchema = mongoose.Schema({
    winCondition: String, 
})

function validateSpecialElection(specialElection) {
    const schema = new joi.object({
        winCondition: joi.string().required(),
    });
    return schema.validate(specialElection);
}

const spcElec = mongoose.model("Special Elections", specialElectionSchema);

module.exports = { spcElec, validateSpecialElection };