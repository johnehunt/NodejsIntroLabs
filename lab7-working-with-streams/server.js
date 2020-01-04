const express = require("express");
const path = require("path");
const app = express();

// To allow body to be parsed
const bodyParser = require("body-parser");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Load configuration information
const config = require(path.resolve(__dirname,'config/default'));

// Load user route definitions
const books = require(path.resolve(__dirname,'routes/books'));

// Load custom module
const mod = require(path.resolve(__dirname, "custom/mod"));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routing for our services
const router = express.Router();

// Log all messages sent to the server
router.use(function(req, res, next) {
  console.log("Received req.url: " + req.url);
  next(); // make sure we go to the next routes and don't stop here
});

// Set up default route
app.get("/", (req, res) => {
  console.log("In GET /");
  const message = mod.messageOfTheDay();
  res.render("index", {
    title: "Express Template Example",
    message: message
  });
});

// Serve up static files automatically
app.use(express.static(path.resolve(__dirname,"public")));

router
  .route("/books")
  .get(books.getBooks)
  .post(books.postBook)
  .put(books.updateBook);

router
  .route("/books/:isbn")
  .get(books.getBook)
  .delete(books.deleteBook);

  router
  .route("/data")
  .get(books.getData);

// All routes will be prefixed with /api
app.use("/api", router);

// Start listening on default Port
app.listen(config.port, () => {
  console.log("Bookshop Started");
  console.log("Server Running - http://localhost:" + config.port);
});
