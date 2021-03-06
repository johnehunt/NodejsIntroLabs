console.log("Starting Bookshop HTTP Server");
// Load required http module
const http = require("http");
// avoid hard coding the path
const path = require('path')
// Load custom module
const mod = require(path.resolve(__dirname, "custom/mod"));
// const messageOfTheDay = require(path.resolve(__dirname, "custom/mod")).messageOfTheDay;

const server = http.createServer(function(req, res) {
  console.log("Handling", req.url);
  if (req.url == "/contact")
    res.write("<h1>Bookshop Contacts</h1><p> Contact Info.</p>");
  else if (req.url == "/about")
    res.write("<h1>About Bookshop</h1><p>This is the about page.</p>");
  else if (req.url == "/help")
    res.write("<h1>Bookshop Help</h1><p>This is the Help page.</p>");
  else if (req.url == "/")
    // Use the custom module to generate a message of the day
    res.write("<h1>Hello Bookshop World!</h1><p>" + mod.messageOfTheDay() + "</p>");
    //res.write("<h1>Hello Bookshop World!</h1><p>" + messageOfTheDay() + "</p>");
  else {
    res.writeHead(404);
    res.write("page not found");
  }
  res.end();
});

console.log("Bookshop Server Listening on port 8080");
server.listen(8080);

console.log("Booksup Started");
console.log("Try http://localhost:8080/");