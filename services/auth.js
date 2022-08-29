const db = require("../model/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const isPasswordValid = await bcrypt.compare(user.password.toString(), userFound.password)
  
  const token = jwt.sign({
    user: userFound.username,
    password: userFound.password,
  }, 'CruzeiroÉCabuloso', {
    expiresIn: '5h'
  })
  
  return {
    isPasswordValid,
    token,
  }
};

module.exports = {
  findUser,
  insertUser,
  auth,
};
