const mongoose = require("mongoose");
const { userModel } = require("../database/models/userModel");

const jwt = require("jsonwebtoken");

const getTest = async (req, res, next) => {
  const species = req.params.species;
  let results;
  // let isCached = false;

  try {
    // const cacheResults = await redisClient.get(species);
    // if (cacheResults) {
    //   isCached = true;
    //   results = JSON.parse(cacheResults);
    // } else {
    results = await fetchApiData(species);
    if (results.length === 0) {
      throw "API returned an empty array";
    }
    await redisClient.set(species, JSON.stringify(results), {
      EX: 180,
      NX: true,
    });
    // }

    res.send({
      fromCache: false,
      // isCached,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
};

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
  getTest,
};
