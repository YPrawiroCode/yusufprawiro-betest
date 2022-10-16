const express = require("express");
const route = express.Router();

const {
  createEmployee,
  getAllEmployee,
  readEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const { auth } = require("../middleware/auth");

route.post("/create", auth, createEmployee);

route.get("/readall", getAllEmployee);

route.get("/read/:id", auth, readEmployeeById);

route.put("/update/:id", auth, updateEmployee);

route.delete("/del/:id", auth, deleteEmployee);

module.exports = route;
