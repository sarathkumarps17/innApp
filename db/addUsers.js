const User = require("./Model/userModel");
const users = require("./userData.json");

const addUsersToDb = async () => {
  users.forEach(async (user) => {
    let newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await newUser.save();
  });
};
module.exports = addUsersToDb;
