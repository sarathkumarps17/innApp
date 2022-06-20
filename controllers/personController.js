const Person = require("../db/Model/personModel");
exports.searchPerson = async (req, res) => {
  const perPage = 40;
  let page = Math.max(0, req.query.body);
  let query = req.body.filters;
  try {
    let persons = await Person.find(query)
      .limit(perPage)
      .skip(page)
      .select(
        "primaryName birthYear deathYear primaryProfession knownForTitles"
      )
      .populate("knownForTitles");
    // console.log(movies);
    res.status(200).json({ persons });
    // console.log(movies);
  } catch (error) {
    res.status(500);
  }
};
