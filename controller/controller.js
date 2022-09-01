const db = require("../model/database");
const app = require("express")();
const authentication = require("../services/auth");
const verifyToken = require("../middleware/verifyToken");
const validate = require('../services/validateDate')
const dotenv = require('dotenv').config()

app.post("/register", async (req, res) => {
  const user = req.body;
  try {
    let userExists = await authentication.findUser(user);

    if (userExists) {
      res.status(200).json({message: `Usuario ${userExists.username} já está cadastrado!`});
    } else {
        const newUser = await authentication.createUser(user);
        await db.insertUser(newUser);
        res.status(201).json({ message: `Usuario ${newUser.username} cadastrado!`});
    }

  } catch (error) {
    res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
  }
});

app.post("/login", async (req, res) => {
  const user = req.body;

  try {
    const userExists = await authentication.auth(user); 

    if(!userExists) {
      res.status(400).json({ message: `Usuario não cadastrado, favor cadastrar.` });
    }
    else if(userExists && userExists.isPasswordValid) {
      console.log(userExists.token);
      res.status(200).json({ message: `Bem vindo ${user.username}` });
    } 
    else {
      res.status(401).json({ message: `Usuario ou senha incorretos! Tente novamente.` });
    }

  } catch (error) {
      res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const result = await db.findBooks();
    res.status(200).json({message: result});
  } catch (error) {
      res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
  }
});

app.post("/insert", verifyToken,async (req, res) => {
  const book = req.body;
  
  try {
    const newRelease = validate(book.release);
    const newBook = {
      ...book,
      release: newRelease
    };

    const dataExists = newBook.hasOwnProperty('bookName') && newBook.hasOwnProperty('author') && newBook.hasOwnProperty('release') && newBook.hasOwnProperty('price') && newBook.hasOwnProperty('publishingCompany'); 

    const dataIsValid = typeof newBook.bookName == 'string' && typeof newBook.author == 'string' && newBook.release instanceof Date && typeof newBook.price == 'number' && typeof newBook.publishingCompany == 'string';
    
    if(dataExists && dataIsValid){
      const result = await db.insertBook(newBook);
      res.status(201).json({ message: "Livro salvo com sucesso" });
    } else if(!dataExists){
      res.status(400).json({message: "Todos os dados são obrigatórios"})
    } else {
      res.status(400).json({message: "Dados incorretos!"})
    }
    } catch (error) {
        res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
      }
});

app.delete("/delete/:id", verifyToken, async (req, res) => {
  const id = req.params.id
  try {
    const result = await db.deleteBook(id);
    res.status(200).json({ message: "Deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
  }
});

app.put("/update/:id", verifyToken, async (req, res) => {
  const [id, body] = [req.params, req.body];

  try {
    const result = await db.updateBook(id, body);
    res.status(200).json({ message: "Atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
  }
});

module.exports = app;