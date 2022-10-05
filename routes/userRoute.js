const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");
// const tokenMiddleware = require("../middlewares/tokenMiddleware");

route.post(
  "/create",
  // tokenMiddleware.verifyToken,
  userController.createUser
);

// route.get(
//   "/readall",
//   // tokenMiddleware.verifyToken,
//   userController.getAllUser
// );

// route.get(
//   "/read/:id",
//   // tokenMiddleware.verifyToken,
//   userController.readUser
// );

// route.put(
//   "/update/:id",
//   // tokenMiddleware.verifyToken,
//   userController.updateUser
// );

// route.delete(
//   "/del/:id",
//   // tokenMiddleware.verifyToken,
//   userController.deleteUser
// );

module.exports = route;
