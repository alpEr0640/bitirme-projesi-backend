const mongoose = require("mongoose");
const joi = require("joi");
const { elc } = require("../Models/elections");

const voterListSchema = mongoose.Schema({
  electionId: { type: mongoose.Schema.ObjectId, ref: "elc" },
  kimlikNo: String,
  isVoted: {
    type: Boolean,
    default: false,
    }
});

function validateVoterList(voterList) {
  const schema = joi.object({
    electionId: joi.string().required(),
    kimlikNo: joi.string().required(),
    isVoted: joi.Boolean().required(),
  });
  return schema.validate(voterList);
}

const vtr = mongoose.model("vtr", voterListSchema);

module.exports = { vtr, validateVoterList };
