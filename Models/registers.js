const mongoose = require("mongoose");
const joi = require("joi");

const registerSchema = mongoose.Schema({
    name: String,
    surname: String,
    kimlikNo: Number,
    dogumTrh: Date,
    telNo: Number,
});

function validateRegister(register) {
    const schema = new joi.object({
        name: joi.string().required(),
        surname: joi.string().required(),
        dogumTrh:joi.required(),
        kimlikNo: joi.number().required(),
        telNo: joi.number().required(),
    });
    
  return schema.validate(register);
}

const Register = mongoose.model("register", registerSchema);
module.exports = { Register, validateRegister };