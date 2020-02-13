console.log("Starting Bookshop HTTP Server");
// Load required http module
const http = require("http");

// Create the simple web application server
const server = http.createServer(function(req, res) {
  res.write("Welcome to the World of the Bookshop Everyone."); 
  res.end(); 
});

// Set the server to listen to port 8080
console.log("Bookshop Listening on port 8080");
server.listen(8080);

// Notify ready to start operations
console.log("Started - use http://localhost:8080/");