const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathToFile, 'utf-8');

let fileContent = '';
readStream.on('data', (chunk) => {
  fileContent += chunk;
});
readStream.on('end', () => {
  console.log(fileContent);
});
readStream.on('error', (err) => {
  console.log('get error', err.message);
});
