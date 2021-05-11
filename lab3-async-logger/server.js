console.log("Starting Bookshop HTTP Server");

// Load required http module
const http = require("http");

// Load events module and configure eventEmitter
const events = require("events");
const eventEmitter = new events.EventEmitter();

// Set up Log Event Handler
// Create an event handler / callback
function logEventHandler(msg) {
  console.log('logEventHandler Handler Called ' + msg);
};

//Assign the event handler callback to an event:
eventEmitter.on("LogEvent", logEventHandler);

// Create a server that will respond to different URLs
const server = http.createServer(function(req, res) {
  // Access the request URL via req.url property
  // Determine the response based on the submitted url

  //Fire the LogEvent
  eventEmitter.emit("LogEvent", req.url);
  if (req.url == "/contact")
    res.write("<h1>Bookshop Contacts</h1><p> Contact Info.</p>");
  else if (req.url == "/about")
    res.write("<h1>About Bookshop</h1><p>This is the about page.</p>");
  else if (req.url == "/help")
    res.write("<h1>Bookshop Help</h1><p>This is the Help page.</p>");
  else if (req.url == "/")
    res.write("<h1>Hello Bookshop World!</h1><p>Welcome to the Bookshop Everyone.</p>");
  else {
    res.writeHead(404);
    res.write("page not found");
  }
  res.end();
});

server.listen(8080);

console.log('Bookshop Server Started');
console.log('Try http://localhost:8080/');
