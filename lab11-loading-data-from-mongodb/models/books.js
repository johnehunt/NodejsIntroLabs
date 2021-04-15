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

// Exception for use with bad isbns 
class BookError extends Error {
  constructor(args) {
    super(args);
    this.name = "BookError";
  }
}

// Define models functions
// Now these have been updated return a promise, the invoking 
// cocde can provide a then behaviour - avoids use of awaits etc.

function getAllBooks() {
  console.log("model.getAllBooks()");
  return collection.find().toArray()
}

function addBook(book) {
  console.log(`Adding book ${book}`);
  return collection.insertOne(book);
}

function updateBook(book) {
  console.log(`Updating book ${book}`);
  const query = { isbn: book.isbn };
  const newValues = { $set: book };
  return collection.updateOne(query, newValues);
}

function deleteBook(isbn) {
  // Note need to parseInt as isbn is a number
  const query = { isbn: parseInt(isbn) };
  console.log("Deleting ", query);
  return collection.deleteOne(query);
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
