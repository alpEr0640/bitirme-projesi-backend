const moment = require("moment");


module.exports = function (req, res, next) {
  const currentDate = moment();
  if (currentDate.isBefore(req.body.initDate)) {
    return next();
  } else {
    return res
      .status(403)
      .send(currentDate);
  }
};

