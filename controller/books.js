const db = require("../model/database");
const validate = require('../services/validateDate')

const getBooks = async(req, res) => {
    try {
      const result = await db.findBooks();
      res.status(200).json({message: result});
    } catch (error) {
        res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
    }
};
  
const searchBookById = async (req, res) => {
    try {
      const {id} = req.params
      const result = await db.findBook(id)
      
      if(result){
        res.status(200).json({message: result})
      } else {
          res.status(200).json({message: "Livro inexistente!"})
      }
  
    } catch (error) {
        res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
    }
  }
  
const insertBook =  async (req, res) => {
    const book = req.body;
    try {
      const newRelease = validate(book.release);
      const newBook = {
        ...book,
        release: newRelease,
        price: parseInt(book.price)
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
};
  
const deleteBook = async (req, res) => {
    const {id} = req.params
    try {
      const result = await db.deleteBook(id);
      if(result){
        res.status(200).json({ message: "Deletado com sucesso" });
      }else {
        res.status(400).json({message: "Livro não encontrado"})
      }
    } catch (error) {
      res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
    }
};
  
const updateBook = async (req, res) => {
    let book = req.body
  
    try {
      const dateValid = validate(book.release)
      book.release = dateValid
      const result = await db.updateBook(req.params.id, book);
      
      if(result){
        res.status(201).json({ message: "Livro atualizado com sucesso" });
      }else {
        res.status(400).json({message: "Livro não foi atualizado, pois o mesmo não foi encontrado!"})
      }
    } catch (error) {
      res.status(500).json({ message: "Erro. Tente novamente mais tarde!" });
    }
};
  
const searchBookByName = async (req, res) => {
    try {
      const query = req.query
      console.log(query)
      let result = await db.findBookName(query)
      result = result ? result : "Nenhum livro encontrado com esse nome" 
      res.status(200).json({message: result})
    } catch (error) {
      res.status(500).json({message: "Erro. Tente novamente mais tarde!"})
    }
};

module.exports = {
    getBooks,
    searchBookById, 
    insertBook,
    deleteBook,
    updateBook,
    searchBookByName
}