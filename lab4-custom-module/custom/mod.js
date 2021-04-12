console.log("setting up custom module values");

const messages = ["Welcome", "Hello", "Hi There", "Goodday"];
var index = 0;

// Defining function to be exported
function messageOfTheDay() {
  console.log("In messageOfTheDay");
  const msg = messages[index];
  index = index + 1;
  if (index == messages.length) {
    index = 0;
  }
  return msg;
}

// Don't forget to export the message of the day function
module.exports = { messageOfTheDay };
