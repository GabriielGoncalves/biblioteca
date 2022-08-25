const db = require("../model/database");
const app = require("express")();
const authentication = require('../services/auth')


app.post('/register', async (req, res) => {
  const user = req.body
  try {
    let usuario = await authentication.insertUser(user)
    await db.insertUser(usuario)
    res.status(200).json({message: `Usuario: ${user.username} inserido`})
  } catch (error) {
    res.status(404).json({ message: error });
    throw new Error(error);
  }
})
app.post('/login', async (req, res) => {
  const user = req.body
  try {
    const userFound = await searchUser(user)
    const authentication = auth(user, userFound)
    res.status(200).json({authentication})
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