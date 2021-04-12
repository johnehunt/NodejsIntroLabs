console.log("Starting Bookshop HTTP Server");
// Load required http module
const http = require("http");
// avoid hard coding the path
const path = require('path')
// Load custom module
const mod = require(path.resolve(__dirname, "custom/mod"));
// const messageOfTheDay = require(path.resolve(__dirname, "custom/mod")).messageOfTheDay;

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

// Load and configure dotenv
const dotenv = require("dotenv");
const environment = dotenv.config();
if (environment.error) {
  throw environment.error;
}

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

console.log(`Bookshop Server Listening on port ${process.env.PORT}`);
server.listen(process.env.PORT);

console.log("Bookshop Server Started");
console.log(`Try http://localhost:${process.env.PORT}/`);