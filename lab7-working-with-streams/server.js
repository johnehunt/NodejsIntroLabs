const express = require("express");
const path = require("path");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Load configuration information
const config = require(path.resolve(__dirname,'config/default'));

// Load user route definitions
const controllers = require(path.resolve(__dirname,'controllers/books'));

// Load custom module
const mod = require(path.resolve(__dirname, "custom/mod"));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  .get(controllers.getBooks)
  .post(controllers.postBook)
  .put(controllers.updateBook);

router
  .route("/books/:isbn")
  .get(controllers.getBook)
  .delete(controllers.deleteBook);

  router
  .route("/data")
  .get(controllers.getData);

// All routes will be prefixed with /api
app.use("/api", router);

// Start listening on default Port
app.listen(config.port, () => {
  console.log("Bookshop Started");
  console.log("Server Running - http://localhost:" + config.port);
  console.log(`\t see also - http://localhost:${config.port}/api/books`);
  console.log(`\t see also - http://localhost:${config.port}/api/books/1`);
  console.log(`\t see also - http://localhost:${config.port}/api/data`);
});

module.exports = app; // for testing purposes only