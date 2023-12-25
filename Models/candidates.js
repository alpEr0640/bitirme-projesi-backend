const mongoose = require("mongoose");
const joi = require("joi");
const {Schema} = require("mongoose")

const candidateSchema = mongoose.Schema({
    Tc:String,
    name: String,
    surname: String,
});

function validateCandidate(candidate) {
    const schema = new joi.object({
        Tc: joi.string().required(),
        name: joi.string().required(),
        surname: joi.string().required(),
        elections: joi.string().required(),
    });
    return schema.validate(candidate);
}

const Candidate = mongoose.model("candidate", candidateSchema);
module.exports = { Candidate, validateCandidate };