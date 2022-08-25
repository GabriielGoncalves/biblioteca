const db = require("../model/database");
const cryptoJs = require("crypto-js");
const chave_secreta = "CruZ3iR0Ec4bUL0S0!!";

const insertUser = async (user) => {
  let newUser = {};

  try {
    await db.connectDataBase();
    const usuario = await db.searchUser(user);
    if (usuario) {
      return `Usuario ${usuario.username} já existe!`;
    } else {
      const password = cryptoJs.AES.encrypt(user.password, chave_secreta);
      let newPassword = cryptoJs.AES.decrypt(password, chave_secreta);
      newPassword = newPassword.toString(cryptoJs.enc.Base64)

      newUser = {
        username: user.username,
        password: newPassword,
      };
      return newUser;
    }
  } catch (error) {
    return error;
  }
};

const auth = async (user, userFound) => {
  const { username, password } = user;

  const data = await searchUser(user);
  if (data && data.password === password) {
    return `Bem vindo ${username}`;
  } else {
    return `Acesso negado! Usuário ou senha incorreta`;
  }
};

module.exports = {
  insertUser,
  auth,
};