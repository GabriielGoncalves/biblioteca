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
    let newUser = {...user};

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
    const userExists = await findUser(user);
    if(!userExists) return;

    const isPasswordValid = await bcrypt.compare(user.password.toString(), userExists.password);
  
    if(isPasswordValid){
      
      const token = jwt.sign({
        user: {
          ...userExists
        },
      }, process.env.JWT_SECRET, {
        expiresIn: '5h'
      });

      return {
        isPasswordValid,
        token,
      };

    } else {
        return {
          isPasswordValid
        };
    }
  } catch (error) {
    throw new Error(error);
  }
  
};

module.exports = {
  findUser,
  createUser,
  auth,
};
