const mongoose = require("mongoose");
const joi = require("joi");
const { elc } = require("../Models/elections");

const voterListSchema = mongoose.Schema({
  electionId: { type: mongoose.Schema.ObjectId, ref: "elc" },
  kimlikNo: String,
});

function validateVoterList(voterList) {
  const schema = joi.object({
    electionId: joi.string().required(),
    kimlikNo: joi.string().required(),
  });
  return schema.validate(voterList);
}

const vtr = mongoose.model("vtr", voterListSchema);

module.exports = { vtr, validateVoterList };
