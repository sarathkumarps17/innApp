const mongoose = require("mongoose");
require("dotenv").config();
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/test";

const connect = async () => {
  //   console.log(DB_URI);
  mongoose
    .connect(DB_URI)
    .then(console.log("DB is connected"))
    .catch((err) => console.log(err));
};

module.exports = connect;
