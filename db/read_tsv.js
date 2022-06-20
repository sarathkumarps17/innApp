const fs = require("fs");
const { pipeline } = require("stream");
const pushMoviesToDb = require("./pushMoviesTodb");
const pushNamesToDb = require("./pushNamesToDb");

const read_tsv_to_db = (moviePath, personPath) => {
  let readable = fs.createReadStream(moviePath);
  pipeline(readable, new pushNamesToDb(), (err) => {
    if (err) {
      //if error occurs any where in any stream, the errors are forwarded
      //and cleanup is performed where we can clear things up before exiting
      console.error("Pipeline failed.", err);
    } else {
      //will get called when all the data from source stream as passed through all other
      //streams successfully and there is nothing more to be done.
      console.log("Movies loaded to db.");
      let readable = fs.createReadStream(personPath);
      pipeline(readable, new pushMoviesToDb(), (err) => {
        if (err) {
          console.error("Pipeline failed.", err);
        } else {
          console.log("Names loaded to db.");
        }
      });
    }
  });
};
module.exports = read_tsv_to_db;
