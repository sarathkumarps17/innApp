//pushToSqs.js
const stream = require("stream");
const { parse } = require("papaparse");
const Movie = require("./Model/movieModel");
const Person = require("./Model/personModel");
const options = {
  delimiter: "\t",
  header: true,
};

class pushMoviesToDb extends stream.Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
    this.instance = Movie;
    // this.chunk = 0;
  }

  async _transform(chunk, encoding, done) {
    // this.chunk++;
    try {
      let csvRow = parse(chunk.toString(), options);
      await this.processAndSendDataToDb(csvRow);
      csvRow = null;
    } catch (error) {
      done(error);
    }
  }

  async processAndSendDataToDb(csvRow) {
    let { data } = csvRow;
    let movies = await Promise.all(
      data.map(async (obj) => {
        obj._id = obj.tconst;
        obj.genres = obj.genres ? obj.genres.split(",") : "";
        obj.assosiated_persons = await Person.find({
          knownForTitles: obj._id,
        }).select("_id");
        return obj;
      })
    );
    return new Promise((resolve, reject) => {
      console.log(this.chunk);
      this.instance.insertMany(movies, function (err, data) {
        if (err) {
          reject();
        } else {
          //all msgs sent successfully
          resolve();
        }
      });
    });
  }
}

module.exports = pushMoviesToDb;
