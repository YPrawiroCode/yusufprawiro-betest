const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authModel } = require("../database/models/authModel");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const authDetail = await authModel
      .findOne({
        username: username,
      })
      .exec();

    if (authDetail) {
      const newUser = await authModel.findOne({ username: req.body.username });

      const verify = await bcrpyt.compare(
        req.body.password,
        authDetail.password
      );

      if (verify === true) {
        jwt.sign(
          {
            newUser: {
              id: newUser._id,
              username: newUser.username,
            },
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1d" },
          (error, token) => {
            if (error) throw error;
            res.header("Authorization", token).json({
              statusCode: 200,
              message: "Login Sucessfully",
              statustext: "OK",
              data: {
                token: token,
              },
            });
          }
        );
      } else {
        res.status(400).send({
          statusCode: 400,
          message: "Wrong password!",
          statusText: "OK",
        });
      }
    } else {
      res.status(404).send({
        statusCode: 404,
        message: "username not registered, please create user account first",
        statusText: "OK",
      });
    }
  } else {
    res.status(400).send({
      statusCode: 400,
      message: "Please enter Username and Password",
      statusText: "OK",
    });
  }
};

const register = async (req, res) => {
  try {
    const existAuth = await authModel.findOne({
      username: req.body.username,
    });

    if (existAuth) {
      res.status(409).json({
        statusCode: 409,
        statusText: "Fail",
        message: "username Already Exist, please use another username.",
      });
    } else {
      const createdUser = await authModel.create({
        ...req.body,
      });

      const newUser = await authModel.findOne({ username: req.body.username });

      const verify = await bcrpyt.compare(req.body.password, newUser.password);

      if (verify === true) {
        jwt.sign(
          {
            newUser: {
              id: newUser._id,
              username: newUser.username,
            },
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1d" },
          (error, token) => {
            if (error) throw error;

            res.header("Authorization", token).json({
              statusCode: 200,
              message: "Registration Success",
              statustext: "OK",
              data: {
                id: newUser._id,
                username: newUser.username,
                token: token,
              },
            });
          }
        );
      } else {
        res.send({
          statusCode: 204,
          message: "Wrong password!",
          statusText: "OK",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({
      statusCode: 409,
      message: "Registration Failed.",
      statusText: "error",
    });
  }
};

module.exports = {
  login,
  register,
};
