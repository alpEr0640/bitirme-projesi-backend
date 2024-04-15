const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const registerSchema = mongoose.Schema({
  name: String,
  surname: String,
  kimlikNo: String,
  password: String,
  dogumTrh:Date,
  telNo: Number,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

function validateRegister(register) {
  const schema = new joi.object({
    name: joi.string().required(),
    surname: joi.string().required(),
    dogumTrh: joi.required(),
    kimlikNo: joi.string().required(),
    password: joi.string().min(8),
    telNo: joi.number().required(),
    isAdmin: joi.boolean(),
  });

  return schema.validate(register);
}
function validateLogin(user) {
  const schema = new joi.object({
    kimlikNo: joi.string().min(3).max(50).required(),
    password: joi.string().min(5).required(),
  });

  return schema.validate(user);
}

registerSchema.methods.createAuthToken = function () {
  const decodedToken = jwt.sign(
    {
      _id: this._id,
      _isAdmin: this.isAdmin,
      _kimlikNo: this.kimlikNo,
      _password: this.password,
    },
    "jwtPrivateKey"
  );
  return decodedToken;
};

const Register = mongoose.model("register", registerSchema);
module.exports = { Register, validateRegister, validateLogin, };
