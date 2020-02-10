console.log("Starting Bookshop HTTP Server");
// Load required http module
const http = require("http");

// Set up the server
const server = http.createServer(function(req, res) {
  res.write("<h1>Hello Bookshop World!</h1><p>Welcome to the Bookshop Everyone.</p>"); 
  res.end(); 
});

// Make the server listen to port 8080
console.log("Bookshop Listening on port 8080");
server.listen(8080);

// Notify the user that the server is ready
console.log("Started - use http://localhost:8080/");