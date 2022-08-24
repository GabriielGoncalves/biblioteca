const db = require("../model/database");
const app = require("express")();
const jwt = require("jsonwebtoken");

app.get("/books", async (req, res) => {
  try {
    const result = await db.findBooks();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "nada bom" });
    console.log(error);
    throw new Error(error);
  }
});

app.post("/insert", async (req, res) => {
  try {
    const result = await db.insertBook(req.body);
    res.status(201).json({ message: "Livro salvo com sucesso" });
  } catch (error) {
    res.status(404).json({ message: "nada bom" });
    console.log(error);
    throw new Error(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await db.deleteBook(req.params.id);
    res.status(200).json({ message: "Deletado com sucesso" });
  } catch (error) {
    res.status(404).json({ message: "nada bom" });
    console.log(error);
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
    console.log(error);
    throw new Error(error);
  }
});

module.exports = app;