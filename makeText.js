const fs = require('fs');
const axios = require('axios'); 
const { MarkovMachine } = require('./markov');

// Callback-based version of 'getTextFromFile'
function getTextFromFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(`Error reading file ${filePath}: ${err.message}`, null); 
    } else {
      callback(null, data); 
    }
  });
}

// Callback-based version of 'getTextFromURL'
function getTextFromURL(url, callback) {
  axios.get(url)
    .then(response => {
      callback(null, response.data);
    })
    .catch(err => {
      callback(`Error fetching URL ${url}: ${err.message}`, null);
    });
}

// Main logic (modified to use callbacks)
function generateText() {
  const [command, sourceType, source] = process.argv.slice(2);

  if (sourceType === 'file') {
    getTextFromFile(source, (err, text) => {
      processText(err, text);
    });
  } else if (sourceType === 'url') {
    getTextFromURL(source, (err, text) => {
      processText(err, text);
    });
  } else {
    console.error(`Invalid source type: ${sourceType}`);
    process.exit(1);
  }
}

function processText(err, text) {
  if (err) {
    console.error(err);
    process.exit(1); 
  } else {
    const mm = new MarkovMachine(text);
    console.log(mm.makeText());
  }
}

generateText(); 
