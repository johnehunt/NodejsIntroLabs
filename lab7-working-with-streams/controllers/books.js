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
  res.send("Book added");
}

function updateBook(req, res) {
  console.log("updateBook", req.body);
  const book = req.body;
  Books.updateBook(book);
  res.send("Book updated");
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
  res.send("Book deleted");
}

function getData(req, res) {
  const readStream = createReadStream("./data.txt");
  readStream.on("data", data => {
    res.write(data);
  });
  readStream.on("end", data => {
    res.status(200).send();
  });
}

// Now export functions from module
module.exports = { getBooks, getBook, postBook, updateBook, deleteBook, getData };
