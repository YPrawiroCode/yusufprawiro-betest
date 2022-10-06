const mongoose = require("mongoose");

//Require dotenv
require("dotenv").config();

// Setup Connection to Database
const dbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.CONNECTION_URL)

      .then(() => console.log("Database is Connected."));
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
