const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authModel } = require("../database/models/authModel");

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Forbidden,no Token");
  }
  try {
    const decoded = jwt.verify(
      req.header("Authorization"),
      process.env.TOKEN_SECRET
    );
    const data = await authModel.findOne({ id: decoded.id });
    if (!data) {
      return res.status(500).json({
        message: "Auth Id Not Found!",
      });
    }
    req.decoded = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { auth };
