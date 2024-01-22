const mongoose = require("mongoose");
const joi = require("joi");

const directorySchema = mongoose.Schema({
  picturePath: {
    type: String,
    default: "",
  },
});

function validateDirectory(directory) {
    const schema = joi.object({
      picturePath:joi.string(),
    });
    return schema.validate(directory);
}

const drct = mongoose.model("directory", directorySchema);
module.exports = { drct, validateDirectory };
