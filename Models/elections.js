const mongoose = require("mongoose");
const joi = require("joi");
const { Schema } = require("mongoose");
const { ElcType, validateElectionType } = require("../Models/electionTypes");
const { Candidate, validateCandidate } = require("../Models/candidates")

const electionSchema = mongoose.Schema({
  initDate: Date,
  electionType: { type: Schema.Types.ObjectId, ref: "ElcType" },
  candidateId: [{ type: Schema.Types.ObjectId, ref: "candidate" }],
});

function validateElection(Election) {
  const schema = new joi.object({
    initDate: joi.Date().required(),
    electionType: joi.string().required(),
    candidateId:joi.array().required(),
  });
  return schema.validate(Election);
}

const Elc = mongoose.model("Elections", electionSchema);

module.exports = { Elc, validateElection };
