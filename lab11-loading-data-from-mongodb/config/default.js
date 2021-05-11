// Load and configure dotenv
const dotenv = require("dotenv");
const environment = dotenv.config();
if (environment.error) {
  throw environment.error;
}

// Set the port
const port = process.env.PORT;

module.exports = {port}