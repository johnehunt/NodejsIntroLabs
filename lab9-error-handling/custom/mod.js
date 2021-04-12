console.log("setting up values");
const messages = ["Welcome", "Hello", "Hi There", "Goodday"];
var index = 0;

function messageOfTheDay() {
  console.log("In messageOfTheDay");
  const msg = messages[index];
  index = index + 1;
  if (index == messages.length) {
    index = 0;
  }
  return msg;
}

module.exports = { messageOfTheDay };
