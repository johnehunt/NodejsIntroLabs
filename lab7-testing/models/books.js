// Define how data is held
var books = [];

// Set up some initial data
books[1] = {
  isbn: 1,
  author: "Jos Jones",
  title: "JavaScript Today",
  price: 15.55
};
books[321] = {
  isbn: 321,
  author: "Phoebe Davies",
  title: "TypeScript World",
  price: 14.95
};

// Define models functions

function getAllBooks() {
  return books;
}

function addBook(book) {
  books[book.isbn] = book;
}

function updateBook(book) {
  books[book.isbn] = book;
}

function deleteBook(isbn) {
  delete books[isbn];
}

// Export functions from Module
module.exports = { getAllBooks, addBook, updateBook, deleteBook };
