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

// const insertBook = async (documento) => {
//   try {
//     await connectDataBase();
//     const collection = client.db(dbName).collection(collectionEstoque);
//     const results = await collection.insertOne(documento);
//     client.close();
//     return results;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const findBooks = async () => {
  try {
    const results = await Book.find();
    return results;
  } catch (error) {
    throw new Error(error)
  }
};

// const deleteBook = async (_id) => {
//   await connectDataBase();
//   const collection = client.db(dbName).collection(collectionEstoque);
//   const results = await collection.deleteOne({ _id: ObjectId(_id) });
//   client.close();
//   return results;
// };

// const updateBook = async (_id, documento) => {
//   await connectDataBase();
//   const collection = client.db(dbName).collection(collectionEstoque);
//   const results = await collection.updateOne(
//     { _id: ObjectId(_id) },
//     { $set: documento }
//   );
//   client.close();
//   return results;
// };

module.exports = {
  // insertBook,
  findBooks,
  // updateBook,
  // deleteBook,
  insertUser,
  searchUser,
};
