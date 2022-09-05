const mongoose = require('mongoose')
const {userSchema, bookSchema} = require('./models')
const User = mongoose.model('User', userSchema)
const Book = mongoose.model('Book', bookSchema)

const insertUser = async (user) => {
  try {
    const newUser = new User(user)
    const result = await newUser.save();
    return result;
    
  } catch (error) {
      throw new Error(error);
  }
};

const searchUser = async (user) => {
  try {
    const result = await User.findOne({"username": user.username});
    return result;

  } catch (error) {
    throw new Error(error);
  }
};

const insertBook = async (book) => {
  try {
    const newBook = Book(book)
    const results = newBook.save()
    return results;
  } catch (error) {
    throw new Error(error);
  }
};

const findBooks = async () => {
  try {
    const results = await Book.find();
    return results;
  } catch (error) {
    throw new Error(error)
  }
};

const deleteBook = async (id) => {
  try {
    const results = await Book.findByIdAndDelete({ _id: id });
    return results;
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * Nas outras rotas eram necessário que fossem criado um novo objeto da classe User ou Book
 * Na parte do update não será necessário, pois se criar com o modelo, vai vir com outro id
 * O que não deixará atualizar, pois o id tem que ser imutavel
 */
const updateBook = async (id, book) => {
  try {
    const results = await Book.findOneAndUpdate({'_id': id}, book)
    return results;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
};

const findBook = async (id) => {
  try {
    const result = await Book.findById({_id: id})
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  insertBook,
  findBooks,
  updateBook,
  deleteBook,
  insertUser,
  searchUser,
  findBook
};
