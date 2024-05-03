const mongoose = require("mongoose");
const joi = require("joi");
const fs = require("fs");
const { Schema } = require("mongoose");
const { ElcType } = require("../Models/electionTypes");
const { Candidate } = require("../Models/candidates");
const {vtr} = require("../Models/voterList");
const { type } = require("os");

const electionSchema = mongoose.Schema({
  initDate: Date,
  endDate: Date,
  electionTitle: String,
  electionExplanation: String,
  electionType: { type: Schema.Types.ObjectId, ref: "ElcType" },
  candidates: [{ type: Schema.Types.ObjectId, ref: "candidate" }],
  voter: [{ type: Schema.Types.ObjectId, ref: "vtr" }],
  winCondition: String
});

function validateElection(Election) {
  const schema = new joi.object({
    initDate: joi.date().required(),
    endDate: joi.date().required(),
    electionTitle: joi.string().max(50).required(),
    electionExplanation: joi.string().required(),
    electionType: joi.string().required(),
    /* candidates: joi.array().required(),
    voter: joi.array(),
    winCondition:joi.string().required(), */
  });
  return schema.validate(Election);
}

const Elc = mongoose.model("Elections", electionSchema);

module.exports = { Elc, validateElection };
