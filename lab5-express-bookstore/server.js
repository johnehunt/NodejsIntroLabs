const express = require("express");
const path = require("path");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// Load custom module
const mod = require(path.resolve(__dirname, "custom/mod"));

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

app.listen(8080, () => {
  console.log("Bookshop Started");
  console.log("Bookshop Server Running - http://localhost:8080");
  console.log("\t see also - http://localhost:8080/about.html");
  console.log("\t see also - http://localhost:8080/contact.html");
  console.log("\t see also - http://localhost:8080/help.html");
});
