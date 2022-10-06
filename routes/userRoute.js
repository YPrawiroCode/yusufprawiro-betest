const express = require("express");
const route = express.Router();

const {
  createUser,
  getAllUser,
  readUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { auth } = require("../middleware/auth");

route.post("/create", auth, createUser);

route.get("/readall", auth, getAllUser);

route.get("/read/:id", auth, readUserById);

route.put("/update/:id", auth, updateUser);

route.delete("/del/:id", auth, deleteUser);

module.exports = route;
