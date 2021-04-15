const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const URL = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "bookshopdb";
const COLLECTION_NAME = "books";
var collection; // used to hold reference to mongodb collection

/*
Function sets up the mongodb database connection
and obtains a reference to the collection which is used throughout
this example
*/
function setupMongoConnection() {
  return MongoClient
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((client) => {
      const database = client.db(DATABASE_NAME);
      collection = database.collection(COLLECTION_NAME);
      console.log(
        "Connected to '" +
          DATABASE_NAME +
          "' using collection " +
          COLLECTION_NAME
      );
    })
    .catch((err) => {
      console.err("Problem connecting to MongoDB");
      throw err;
    });
}

class BookError extends Error {
  constructor(args) {
    super(args);
    this.name = "BookError";
  }
}

// Define models functions
// Now these have bene updated to take a response object
// so that the callback and provide a response back to the client when
// it runs - avoids use of awaits etc.

function getAllBooks() {
  console.log("model.getAllBooks()");
  const promise = new Promise((resolve, reject) => {
    collection.find().toArray((err, books) => {
      if (err) reject(err);
      console.log("model.getAllBooks() - setting response");
      resolve(books);
    });
  });
  return promise;
}


function addBook(book) {
  const promise = new Promise((resolve, reject) => {
    collection.insertOne(book, (err, result) => {
      if (err) reject(err);
      console.log("1 document inserted: " + JSON.stringify(book));
      resolve();
    });
  });
  return promise;
}

function updateBook(book) {
  const promise = new Promise((resolve, reject) => {
    const query = { isbn: book.isbn };
    const newValues = { $set: book };
    collection.updateOne(query, newValues, (err, result) => {
      if (err) reject(err);
      console.log("1 document updated: " + JSON.stringify(book));
      resolve();
    });
  });
  return promise;
}

function deleteBook(isbn) {
  const promise = new Promise((resolve, reject) => {
    // Note need to parseInt as isbn is a number
    const query = { isbn: parseInt(isbn) };
    console.log("Deleting ", query);
    collection.deleteOne(query, (err, obj) => {
      if (err) reject(err);
      console.log("1 document deleted: " + isbn);
      resolve();
    });
  });
  return promise;
}

// Export functions from Module
module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  BookError,
  setupMongoConnection
};
