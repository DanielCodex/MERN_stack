const mongoose = require("mongoose");
/**
 *
 * @param {string} id
 */
function validId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = validId;
