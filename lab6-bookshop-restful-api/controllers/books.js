// Load Models
const Books = require("../models/books");

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
    const id = req.params.id;
    Books.deleteBook(id);
  res.status(204).send("Book deleted");
}

// Now export functions from module
module.exports = {getBooks, getBook, postBook, updateBook, deleteBook}