const express = require("express");
const path = require("path");
const app = express();

// To allow body to be parsed
const bodyParser = require("body-parser");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Load configuration information
const config = require(path.resolve(__dirname, "config/default"));

// Load user controller definitions
const controllers = require(path.resolve(__dirname, "controllers/books.js"));

// Load custom module
const mod = require(path.resolve(__dirname, "custom/mod"));

// configure app to parse the request body for post and put
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routing for our services
const router = express.Router();

// Log all messages sent to the server
router.use((req, res, next) => {
  console.log("Received req.url: " + req.url);
  next(); // make sure we go to the next routes and don't stop here
});

// Set up default route
app.get("/", (req, res) => {
  console.log("In GET /");
  const message = mod.messageOfTheDay();
  res.render("index", {
    title: "Express Template Example",
    message: message,
  });
});

// Serve up static files automatically
app.use(express.static(path.resolve(__dirname, "public")));

router
  .route("/books")
  .get(controllers.getBooks)
  .post(controllers.postBook)
  .put(controllers.updateBook);

router
  .route("/books/:isbn")
  .get(controllers.getBook)
  .delete(controllers.deleteBook);

// All routes will be prefixed with /api
app.use("/api", router);

// Start listening on default Port
app.listen(config.port, () => {
  console.log("Bookshop Started");
  console.log("Server Running - http://localhost:" + config.port);
  console.log('\t see also - http://localhost:8080/api/books');
  console.log('\t see also - http://localhost:8080/api/books/1');
});
