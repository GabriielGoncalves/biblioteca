const db = require("../model/database");
const authentication = require("../services/auth");

const register = async (req, res) => {
    const user = req.body;
    try {
      const userExists = await authentication.findUser(user);
  
      if (userExists) {
        res.status(200).json({message: `Usuario ${userExists.username} já está cadastrado!`});
      } else {
          const newUser = await authentication.createUser(user);
          await db.insertUser(newUser);
          res.status(201).json({ message: `Usuario ${newUser.username} cadastrado!`});
      }
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
    }
  };


const login = async (req, res) => {
    const user = req.body;
  
    try {
      const userExists = await authentication.auth(user); 
  
      if(!userExists) {
        res.status(400).json({ message: `Usuario não cadastrado, favor cadastrar.` });
      }
      else if(userExists.userFound.active && userExists.isPasswordValid) {
        console.log(userExists.token);
        res.status(200).json({ message: `Bem vindo ${user.username}` });
      } 
      else {
        res.status(401).json({ message: `Usuario ou senha incorretos! Tente novamente.` });
      }
  
    } catch (error) {
        res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
    }
  };

  module.exports = {
    login,
    register
  }