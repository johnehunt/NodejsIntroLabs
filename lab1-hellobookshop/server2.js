console.log("Starting Bookshop HTTP Server");
// Load required http module
const http = require("http");
// Load commander module
const commander = require('commander');

// Check commander for actions
commander
  .option('-d, --debug', 'output extra debugging')
  .option('-l, --long', 'provide long form information')
  .option('-p, --printer <message>', 'pretty print a message', 'hello');

commander.parse(process.argv);

const options = commander.opts();

if (options.debug) console.log('debug mode turned on');
if (options.long) console.log('This provides long form information');
if (options.printer) console.log(`printer ${options.printer}`);

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
