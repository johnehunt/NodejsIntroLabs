// Load Models
const Books = require("../models/books");

function setupMongo() {
  Books.setupMongo();
}

// Defines Controller functions
function getAllBooks(req, res) {
  console.log("routes.getAllBooks()");
  Books.getAllBooks(res);
}

function postBook(req, res) {
  console.log("postBook", req.body);
  const book = req.body;
  Books.addBook(res, book);
}

function updateBook(req, res) {
  console.log("updateBook", req.body);
  const book = req.body;
  Books.updateBook(res, book);
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
  Books.deleteBook(res, isbn);
}

function getData(req, rea) {
  const readStream = createReadStream("./data.txt");
  readStream.on("data", data => {
    res.write(data);
  });
  readStream.on("end", data => {
    res.status(200).send();
  });
}

// Now export functions from module
module.exports = { getAllBooks, getBook, postBook, updateBook, deleteBook, getData, setupMongo };
