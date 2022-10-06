const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const authSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    set: encryptedPassword,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const authModel = mongoose.model("auth", authSchema, "auth");

module.exports = { authModel, authSchema };

function encryptedPassword(password) {
  const encryptedPassword = bcrypt.hashSync(password, 10);
  return encryptedPassword;
}
