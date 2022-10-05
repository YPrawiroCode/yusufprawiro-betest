const mongoose = require("mongoose");
const { userModel } = require("../database/models/userModel");

const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const createdUser = await userModel.create({
      ...req.body,
    });
    console.log(
      "🚀 ~ file: userController.js ~ line 10 ~ createUser ~ req.body,",
      req.body
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Registration Failed.",
      statusText: "error",
    });
  }
};

module.exports = {
  // getUser,
  createUser,
  // updateUser,
  // getAllUsers,
};
