// Custom exception class fo ruse with bookshop model
class BookError extends Error {
  constructor(args) {
    super(args);
    this.name = "BookError";
  }
}

// Define how data is held
var books = [];

// Set up some initial data
books[0] = {
  isbn: '0',
  author: "Jasmine Jones",
  title: "JavaScript Today",
  price: 15.55
};
books[1] = {
  isbn: '1',
  author: "Phoebe Davies",
  title: "TypeScript World",
  price: 14.95
};
books[2] = {
  isbn: '2',
  author: "Adam Smith",
  title: "Node Unleashed",
  price: 13.95
};

// Define models functions

function getAllBooks() {
  return books;
}

function addBook(book) {
  books[book.isbn] = book;
}

function updateBook(book) {
  if (!(book.isbn in books)) {
    throw new BookError("Unknown book with ISBN " + book.isbn);
  }
  books[book.isbn] = book;
}

function deleteBook(isbn) {
  console.log(books);
  console.log(isbn);
  if (!(isbn in books)) {
    throw new BookError("Unknown book with ISBN " + isbn);
  }
  delete books[isbn];
}

// Export functions from Module
module.exports = { getAllBooks, addBook, updateBook, deleteBook, BookError };
