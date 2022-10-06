const mongoose = require("mongoose");
const { userModel } = require("../database/models/userModel");

const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const createdUser = await userModel.create({
      ...req.body,
    });
    res.status(201).json({
      statusCode: 201,
      message: "Data Tersimpan",
      statusText: "Sukses",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Registration Failed.",
      statusText: "error",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    // console.log(req.decoded);
    const userDetails = await userModel.find();
    res.status(200).json({
      statusCode: 200,
      message: "Data Berhasil Ditampilkan",
      statusText: "Sukses",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Registration Failed.",
      statusText: "error",
    });
  }
};

const readUserById = async (req, res) => {
  const { id: _id } = req.params;
  const newData = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(500).send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: "Format Id invalid",
    });
  } else {
    const data = await userModel.findById(_id);
    if (!data) {
      return res.status(404).send({
        statusCode: 404,
        statusText: "fail",
        statusMessage: "Id not found",
      });
    } else {
      return res.send({
        statusCode: 200,
        statusText: "success",
        data: data,
      });
    }
  }
};

const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const newData = req.body;

  const up = newData.push;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: "Format Id invalid",
    });
  } else {
    const data = await userModel.findById(_id);
    if (!data) {
      return res.status(500).send({
        statusCode: 500,
        statusText: "fail",
        statusMessage: "Id not found",
      });
    } else {
      const updatedUser = await userModel.findByIdAndUpdate(_id, newData, {
        new: true,
      });
      return res.send({
        statusCode: 200,
        statusText: "success",
        data: updatedUser,
      });
    }
  }
};

const deleteUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: "Format Id invalid",
    });
  } else {
    const data = await userModel.findById(_id);
    if (!data) {
      return res.status(500).send({
        statusCode: 500,
        statusText: "fail",
        statusMessage: "Id not found",
      });
    } else {
      const deleteUsers = await userModel.find({ _id }).deleteOne();
      return res.send({
        statusCode: 200,
        statusText: "success",
        message: "Data Berhasil Di hapus",
      });
    }
  }
};

module.exports = {
  createUser,
  updateUser,
  readUserById,
  getAllUser,
  deleteUser,
};
