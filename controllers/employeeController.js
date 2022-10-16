const mongoose = require("mongoose");
const { employeeModel } = require("../database/models/employeeModel");

const jwt = require("jsonwebtoken");

const createEmployee = async (req, res) => {
  try {
    const createdEmployee = await employeeModel.create({
      ...req.body,
    });
    res.status(201).json({
      statusCode: 201,
      message: "Data Tersimpan",
      statusText: "Sukses",
      data: createdEmployee,
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

const getAllEmployee = async (req, res) => {
  try {
    // console.log(req.decoded);
    const userDetails = await employeeModel.find();
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

const readEmployeeById = async (req, res) => {
  const { id: _id } = req.params;
  const newData = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(500).send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: "Format Id invalid",
    });
  } else {
    const data = await employeeModel.findById(_id);
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

const updateEmployee = async (req, res) => {
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
    const data = await employeeModel.findById(_id);
    if (!data) {
      return res.status(500).send({
        statusCode: 500,
        statusText: "fail",
        statusMessage: "Id not found",
      });
    } else {
      const updatedEmployee = await employeeModel.findByIdAndUpdate(
        _id,
        newData,
        {
          new: true,
        }
      );
      return res.send({
        statusCode: 200,
        statusText: "success",
        data: updatedEmployee,
      });
    }
  }
};

const deleteEmployee = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: "Format Id invalid",
    });
  } else {
    const data = await employeeModel.findById(_id);
    if (!data) {
      return res.status(500).send({
        statusCode: 500,
        statusText: "fail",
        statusMessage: "Id not found",
      });
    } else {
      const deleteEmployees = await employeeModel.find({ _id }).deleteOne();
      return res.send({
        statusCode: 200,
        statusText: "success",
        message: "Data Berhasil Di hapus",
      });
    }
  }
};

module.exports = {
  createEmployee,
  updateEmployee,
  readEmployeeById,
  getAllEmployee,
  deleteEmployee,
};
