const db = require("../model/database");
const bcrypt = require("bcrypt");

const findUser = async (user) => {
  try {
    const usuario = await db.searchUser(user);
    if (usuario) {
      return usuario;
    } else return;
  } catch (error) {
    return error;
  }
};

const insertUser = async (user) => {
  try {
    let newUser = {};

    const newPassword = await bcrypt.hash(
      user.password.toString(),
      await bcrypt.genSalt()
    );

    newUser = {
      username: user.username,
      password: newPassword,
    };

    return newUser;
  } catch (error) {
    return error;
  }
};

const auth = async (user, userFound) => {
  const isPasswordValid = await bcrypt.compare(user.password, userFound.password)

  return isPasswordValid
};

module.exports = {
  findUser,
  insertUser,
  auth,
};
