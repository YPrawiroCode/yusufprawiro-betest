// const mongoose = require("mongoose");

// //Require dotenv
// require("dotenv").config();

// // Setup Connection to Database
// const dbConnection = async () => {
//   try {
//     await mongoose
//       .connect(
//         `mongodb+srv://betest:betest@db-yusufprawiro.fpvublh.mongodb.net/test?authSource=admin&replicaSet=atlas-k7uwqv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
//       )

//       .then(() => console.log("Database is Connected."));
//   } catch (error) {
//     console.log(error);
//   }
// };

const mongoose = require("mongoose");

//Require dotenv
require("dotenv").config();

// Setup Connection to Database
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);

    console.log("Database is Connected.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
