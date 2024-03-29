// Define how data is held
const books = [];

// Set up some initial data
books[0] = { isbn: 1, author: "Jasmine Jones", title: "JavaScript Today", price: 15.55 };
books[1] = { isbn: 2, author: "Adam Smith", title: "Node.js Unleased", price: 12.55 };

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
module.exports = {getAllBooks, addBook, updateBook, deleteBook};