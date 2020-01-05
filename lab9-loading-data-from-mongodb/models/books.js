const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const URL = "mongodb://localhost:27017";
const DATABASE_NAME = "bookshopdb";
const COLLECTION_NAME = "books";
var collection;

function setupMongo() {
  MongoClient.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(err, client) {
      if (err) {
        console.err("Problem connecting to MongoDB");
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

function getAllBooks() {
  var books;
  collection.find({}).toArray((err, results) => {
    if (err) throw err;
    books = results;
  });
  return books;
}

function addBook(book) {
  books[book.isbn] = book;
}

function updateBook(book) {
  if (!(isbn in books)) {
    throw new BookError("Unknown book with ISBN " + isbn);
  }
  books[book.isbn] = book;
}

function deleteBook(isbn) {
  if (!(isbn in books)) {
    throw new BookError("Unknown book with ISBN " + isbn);
  }
  delete books[isbn];
}

// Export functions from Module
module.exports = { getAllBooks, addBook, updateBook, deleteBook, BookError, setupMongo };
