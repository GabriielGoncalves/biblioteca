const db = require("../model/database");
const app = require("express")();
const authentication = require('../services/auth')


app.post('/register', async (req, res) => {
  const user = req.body
  try {
    let usuario = await authentication.findUser(user)
    if(usuario){
      res.status(200).json({message: `Usuario ${usuario.username} já está cadastrado!`})
    }else {
      const newUser = await authentication.insertUser(user)
      await db.insertUser(newUser)
      res.status(200).json({message: `Usuario ${newUser.username} cadastrado!`})
    }
  } catch (error) {
    res.status(404).json({ message: error });
    throw new Error(error);
  }
})

app.post('/login', async (req, res) => {
  const user = req.body

  try {
    const userFound = await authentication.findUser(user)
    if(userFound){
      const isAuthentication = await authentication.auth(user, userFound)
      
      if(!!isAuthentication){
        res.status(200).json({message: `Bem vindo ${user.username}`})
      }else {
        res.status(400).json({message: `Usuario ou senha incorretos! Tente novamente.`})
      }

    } else {
        res.status(400).json({message: `Usuario não cadastrado, favor cadastrar.`})
      }
  } catch (error) {
    res.status(404).json({ message: error });
    throw new Error(error);
  }
})

app.get("/books", async (req, res) => {
  try {
    const result = await db.findBooks();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "nada bom" });
    throw new Error(error);
  }
});

app.post("/insert", async (req, res) => {
  try {
    const result = await db.insertBook(req.body);
    res.status(201).json({ message: "Livro salvo com sucesso" });
  } catch (error) {
    res.status(404).json({ message: "nada bom" });
    throw new Error(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await db.deleteBook(req.params.id);
    res.status(200).json({ message: "Deletado com sucesso" });
  } catch (error) {
    res.status(404).json({ message: "nada bom" });
    throw new Error(error);
  }
});

app.put("/update/:id", async (req, res) => {
  const [id, body] = [req.params, req.body];

  try {
    const result = await db.updateBook(id, body);
    res.status(200).json({ message: "Atualizado com sucesso" });
  } catch (error) {
    res.status(404).json({ message: "nada bom" });
    throw new Error(error);
  }
});

module.exports = app;