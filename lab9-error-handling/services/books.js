
const http = require("http");
const fetch = require("node-fetch");

const URL = 'https://openlibrary.org/works/OL45883W.json';

function getBookDetails() {
    console.log(`In service getBookDetails() - ${URL}`);
    return fetch(URL).then((res) => res.json());
}

// Export function from module
module.exports = { getBookDetails };