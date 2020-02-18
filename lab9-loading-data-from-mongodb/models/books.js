const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const URL = "mongodb://localhost:27017";
const DATABASE_NAME = "bookshopdb";
const COLLECTION_NAME = "books";
var collection; // used to hold reference to mongodb collection

/*
Function sets up the mongodb database connection
and obtains a reference to the collection which is used throughout
this example
*/
function setupMongo() {
  MongoClient.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(err, client) {
      if (err) {
        console.error("Problem connecting to MongoDB");
        throw err;
      }
      const database = client.db(DATABASE_NAME);
      collection = database.collection(COLLECTION_NAME);
      console.log(
        "Connected to '" +
          DATABASE_NAME +
          "' using collection " +
          COLLECTION_NAME
      );
    }
  );
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

function getAllBooks(res) {
  console.log("model.getAllBooks()");
  return collection.find().toArray((err, books) => {
    if (err) throw err;
    console.log("model.getAllBooks() - setting response");
    res.json(books);
  });
}

function addBook(res, book) {
  collection.insertOne(book, (err, result) => {
    if (err) throw err;
    console.log(result + "document inserted: " + JSON.stringify(book));
    res.status(201);
  });
}

function updateBook(res, book) {
  const query = { isbn: book.isbn };
  const newValues = {$set: book};
  collection.updateOne(query, newValues, (err, result) => {
    if (err) throw err;
    console.log("1 document updated: " + JSON.stringify(book));
    res.status(202);
  });
}

function deleteBook(res, isbn) {
  // Note need to parseInt as isbn is a number
  const query = { isbn: parseInt(isbn) };
  console.log("Deleting ", query);
  collection.deleteOne(query, (err, obj) => {
    if (err) throw err;
    console.log("1 document deleted: " + isbn);
    res.status(202);
  });
}

// Export functions from Module
module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  BookError,
  setupMongo
};
