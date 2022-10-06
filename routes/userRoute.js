const express = require("express");
const route = express.Router();

const {
  createUser,
  getAllUser,
  readUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// const tokenMiddleware = require("../middlewares/tokenMiddleware");

route.post(
  "/create",
  // tokenMiddleware.verifyToken,
  createUser
);

route.get(
  "/readall",
  // tokenMiddleware.verifyToken,
  getAllUser
);

route.get(
  "/read/:id",
  // tokenMiddleware.verifyToken,
  readUserById
);

route.put(
  "/update/:id",
  // tokenMiddleware.verifyToken,
  updateUser
);

route.delete(
  "/del/:id",
  // tokenMiddleware.verifyToken,
  deleteUser
);

module.exports = route;
