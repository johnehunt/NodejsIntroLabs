// Load built-in modules
const fs = require('fs');
const path = require('path')

// Load custom modules
const Books = require("../models/books");
const Service = require("../services/books");

// Defines Controller functions
function getBooks(req, res) {
  const books = Books.getAllBooks();
  res.json(books);
}

function postBook(req, res) {
  console.log("postBook", req.body);
  const book = req.body;
  Books.addBook(book);
  res.status(201).send("Book added");
}

function updateBook(req, res) {
  console.log("updateBook", req.body);
  const book = req.body;
  Books.updateBook(book);
  res.status(201).send("Book updated");
}

function getBook(req, res) {
  res.json({
    isbn: req.params.isbn,
    title: "Node.js Uncovered",
    author: "John Hunt",
    price: 10.99
  });
}

function deleteBook(req, res) {
  const isbn = req.params.isbn;
  Books.deleteBook(isbn);
  res.status(204).send("Book deleted");
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

function getBookDetails(req, res) {
  console.log('Calling getBookDetails()');
  Service
    .getBookDetails()
    .then((bookInfo) => {
      console.log(`processing promise result: ${bookInfo}`)
      res.json(bookInfo);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
}

// Now export functions from module
module.exports = { getBooks, getBook, postBook, updateBook, deleteBook, getData, getBookDetails };
