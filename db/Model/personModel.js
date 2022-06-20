const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema(
  {
    _id: String,
    primaryName: { type: String, index: true },
    birthYear: String,
    deathYear: String,
    primaryProfession: [{ type: String, index: true }],
    knownForTitles: [{ type: String, index: true, ref: "Movie" }],
  },
  { _id: false }
);
const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
