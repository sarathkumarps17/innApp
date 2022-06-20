const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./db/connect");
var bodyParser = require("body-parser");
const PORT = process.env.PORT;
// const write_tsv_to_db = require("./db/read_tsv");
const router = require("./routes/routes");
// const addUsersToDb = require("./db/addUsers");

const server = express();

connect();
// .then
// write_tsv_to_db("../raw db/name.basics.tsv", "../raw db/test.title.tsv")
// write_tsv_to_db("../raw db/test.name.tsv", "../raw db/test.title.tsv")
// ();
// .then(addUsersToDb());
//   run the write_tsv_to_db function to add tsv data to mongodb
server.use(bodyParser.json());
server.use(cors());
server.use(router);

server.listen(PORT, () => console.log(`server is up on port ${PORT}`));
