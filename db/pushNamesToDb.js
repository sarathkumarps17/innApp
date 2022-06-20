//pushToSqs.js
const stream = require("stream");
const { parse } = require("papaparse");
const Person = require("./Model/personModel");
const options = {
  delimiter: "\t",
  header: true,
};

class pushNamesToDb extends stream.Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
    this.instance = Person;
  }

  async _transform(chunk, encoding, done) {
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
    let person = data.map((obj) => {
      obj._id = obj.nconst;
      obj.primaryProfession = obj.primaryProfession
        ? obj.primaryProfession.split(",")
        : "";
      obj.knownForTitles = obj.knownForTitles
        ? obj.knownForTitles.split(",")
        : "";
      return obj;
    });
    return new Promise((resolve, reject) => {
      // console.log(data);
      this.instance.insertMany(person, function (err, data) {
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

module.exports = pushNamesToDb;
