const mongoose = require("mongoose");
const joi = require("joi");

const electionTypeSchema =new mongoose.Schema({
    electionType: String,
});

function validateElectionType(ElectionType) {
    
    const schmea = new joi.object({
        electionType: joi.string().required(),
    });
    return schmea.validate(ElectionType);
}

const ElcType = mongoose.model("ElcType", electionTypeSchema);
module.exports = {ElcType, validateElectionType};
