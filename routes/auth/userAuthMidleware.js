const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER_TOKEN_SECRET = process.env.USER_TOKEN_SECRET;

/// user auth midleware////
module.exports = function (req, res, next) {
  const token = req.header("X-Auth-Token");

  if (!token) {
    console.log("unautherised login attempt");
    return res.status(401).json({ error: "No token, Autherisation denied" });
  }

  try {
    const decoded = jwt.verify(token, USER_TOKEN_SECRET);
    req.user_id = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "invalid token, Autherisation denied " });
  }
};
