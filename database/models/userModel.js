const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const { RestoAddressSchema } = require("./restoAddressModel");

const userSchema = new Schema({
  userName: {
    type: String,
  },
  // resto_address: [RestoAddressSchema],
  accountNumber: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  identityNumber: {
    type: String,
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

const userModel = mongoose.model("user", userSchema, "user");

module.exports = { userModel, userSchema };
