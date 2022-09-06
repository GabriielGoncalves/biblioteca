const db = require("../model/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const findUser = async (user) => {
  try {
    const userFound = await db.searchUser(user);
    
    if (userFound) {
      return userFound;
    } else return;

  } catch (error) {
      throw new Error(error);
  }
};

const createUser = async (user) => {
  try {
    let newUser = {
      ...user,
      active: true
    };

    const newPassword = await bcrypt.hash(
      user.password.toString(),
      await bcrypt.genSalt()
    );

    newUser.password = newPassword;

    return newUser;
  } catch (error) {
      throw new Error(error);
  }
};

const auth = async (user) => {
  try {
    const userFound = await findUser(user);
    if(!userFound) return;

    const isPasswordValid = await bcrypt.compare(user.password.toString(), userFound.password);
  
    if(isPasswordValid && userFound.active){
      
      const token = jwt.sign({
        user: {
          ...userFound
        },
      }, process.env.JWT_SECRET, {
        expiresIn: '5h'
      });

      return {
        userFound,
        isPasswordValid,
        token,
      };

    } else return isPasswordValid;
  } catch (error) {
    throw new Error(error);
  }
  
};

module.exports = {
  findUser,
  createUser,
  auth,
};
