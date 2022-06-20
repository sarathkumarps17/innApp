const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    _id: String,
    assosiated_persons: [{ type: String, ref: "Person" }],
    titleType: { type: String, index: true },
    primaryTitle: { type: String, index: true },
    originalTitle: String,
    isAdult: Boolean,
    startYear: { type: String, index: true },
    endYear: String,
    runtimeMinutes: String,
    genres: [{ type: String, index: true }],
  },
  { _id: false }
);
const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
