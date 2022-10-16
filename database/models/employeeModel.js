const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeName: {
    type: String,
  },
  status: {
    type: String,
  },
  division: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
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

const employeeModel = mongoose.model("employee", employeeSchema, "employee");

module.exports = { employeeModel, employeeSchema };
