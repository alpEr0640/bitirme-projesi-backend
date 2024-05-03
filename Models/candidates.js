const mongoose = require("mongoose");
const joi = require("joi");
const { Schema } = require("mongoose");
const { Register, validateRegister } = require("../Models/registers");

const candidateSchema = mongoose.Schema({
  candidateId: { type: Schema.Types.ObjectId, ref: "register" },
  vote: {
    type: Number,
    default: "0"
  },
  aboutCandidate: String

});



function validateCandidate(candidate) {
    const schema = new joi.object({
      candidateId: joi.string().required(),
    });
  return schema.validate(candidate);
}

const Candidate = mongoose.model("candidate", candidateSchema);
module.exports = { Candidate, validateCandidate };
