const express = require("express");
const router = express.Router();
const { searchMovie } = require("../controllers/movieController");
const { searchPerson } = require("../controllers/personController");
const { signinUser } = require("../controllers/UserSignInController");
const userAuth = require("./auth/userAuthMidleware");

// middleware that is specific to this router

// define the home page route
router.post("/", signinUser);
router.get("/movies", userAuth, searchMovie);
// define the about route
router.get("/person", userAuth, searchPerson);

module.exports = router;
