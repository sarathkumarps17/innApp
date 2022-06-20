const Movie = require("../db/Model/movieModel");

exports.searchMovie = async (req, res) => {
  // console.log(req.body);
  const perPage = 10;
  let page = Math.max(0, req.body.page);
  let query = req.body.filters;
  try {
    let movies = await Movie.find(query)
      .limit(perPage)
      .skip(page)
      .select("titleType primaryTitle startYear genres assosiated_persons")
      .populate("assosiated_persons");
    res.status(200).json({ movies });
    // console.log(movies);
  } catch (error) {
    res.status(500);
  }

  // res.send("movie search route");
};
