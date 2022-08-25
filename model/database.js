const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "biblioteca";
const collectionEstoque = "estoque";
const collectionUser = "users";

async function connectDataBase() {
  try {
    await client.connect();

    return "Connected successfully to server";
  } catch (e) {
    return e;
  }
}

const insertUser = async (user) => {
  try {
    await connectDataBase();
    const collection = client.db(dbName).collection(collectionUser);
    const result = await collection.insertOne(user);
    client.close();
    return result;
  } catch (error) {
    return e;
  }
};

const searchUser = async (user) => {
  try {
    await connectDataBase();
    const collection = client.db(dbName).collection(collectionUser);
    const result = await collection.findOne({"username": user.name})
    return result
  } catch (error) {}
};

const insertBook = async (documento) => {
  try {
    await connectDataBase();
    const collection = client.db(dbName).collection(collectionEstoque);
    const results = await collection.insertOne(documento);
    client.close();
    return results;
  } catch (error) {
    throw new Error(error);
  }
};

const findBooks = async () => {
  await connectDataBase();
  const collection = client.db(dbName).collection(collectionEstoque);
  const results = await collection.find({}).toArray();
  client.close();
  return results;
};

const deleteBook = async (_id) => {
  await connectDataBase();
  const collection = client.db(dbName).collection(collectionEstoque);
  const results = await collection.deleteOne({ _id: ObjectId(_id) });
  client.close();
  return results;
};

const updateBook = async (_id, documento) => {
  await connectDataBase();
  const collection = client.db(dbName).collection(collectionEstoque);
  const results = await collection.updateOne(
    { _id: ObjectId(_id) },
    { $set: documento }
  );
  client.close();
  return results;
};

module.exports = {
  connectDataBase,
  insertBook,
  findBooks,
  updateBook,
  deleteBook,
  insertUser,
  searchUser,
  client,
};
