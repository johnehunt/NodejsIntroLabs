// Load built-in modules
const fs = require('fs');
const path = require('path')

// Load Custom Models
const Books = require("../models/books");

// Provides gateway through to model
// used for initialiing  Mongo db 
function setup() {
  return Books.setupMongoConnection()
}

// Defines Controller functions
function getAllBooks(req, res) {
  console.log("routes.getAllBooks()");
  Books
    .getAllBooks()
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send();
    });
}

function postBook(req, res) {
  console.log("postBook", req.body);
  const book = req.body;
  Books
    .addBook(book)
    .then(() => {
      res.status(201).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send();
    });
}

function updateBook(req, res) {
  console.log("updateBook", req.body);
  const book = req.body;
  Books
    .updateBook(book)
    .then(() => {
      res.status(202).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send();
    });
}

function getBook(req, res) {
  res.json({
    isbn: req.params.isbn,
    title: "Node.js Uncovered",
    author: "John Hunt",
    price: 10.99,
  });
}

function deleteBook(req, res) {
  const isbn = req.params.isbn;
  Books
    .deleteBook(isbn)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send();
    });
}

function getData(req, res) {
  const filename = path.resolve(__dirname,'../data.txt')
  console.log(`Loading ${filename}`)
  const readStream = fs.createReadStream(filename);
  readStream.on("data", data => {
    res.write(data);
  });
  readStream.on("end", data => {
    res.status(200).send();
  });
}

// Now export functions from module
module.exports = {
  getAllBooks,
  getBook,
  postBook,
  updateBook,
  deleteBook,
  getData,
  setup,
};
