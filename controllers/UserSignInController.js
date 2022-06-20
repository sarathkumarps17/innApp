const User = require("../db/Model/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER_TOKEN_SECRET = process.env.USER_TOKEN_SECRET;
// user controller///
exports.signinUser = async (req, res) => {
  // console.log(req);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return res.status(401).json({ err: "Validation error" });
  }

  let email = req.body.email;
  // console.log(email)
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      console.log("Unautherised Access Attempt");
      return res.status(401).json({ err: "No User Found" });
    }
    if (!user.password) {
      return res.status(401).json({ err: "Invalid Credentials" });
    }
    if (req.body.password !== user.password) {
      return res.status(401).json({ err: "Invalid Credentials" });
    }
    // generate user token using user id///
    const user_id = user._id;
    jwt.sign(
      { user_id },
      USER_TOKEN_SECRET,
      { expiresIn: 3600 * 60 },
      (err, token) => {
        if (err) throw err;
        else {
          return res.json({ token, user });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Server Error" });
  }
};
