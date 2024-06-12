const mongoose = require("mongoose");
const joi = require("joi");

const specialElectionSchema = new mongoose.Schema({
    electionType: String,
})

function validateSpecialElectionType(specialElection) {
  const Schema = new joi.object({
    electionType: joi.string().required(),
  });
  return Schema.validate(specialElection);
}
const specialElcType = mongoose.model("Special Election Type", specialElectionSchema);
module.exports = { specialElcType, validateSpecialElectionType };