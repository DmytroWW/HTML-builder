const fs = require('fs');
const path = require('path');
const readline = require('readline');

const resultPath = path.join(__dirname, 'result.txt');
const writeStream = fs.createWriteStream(resultPath, {
  flags: 'a',
  encoding: 'utf8',
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

rl.prompt();

console.log(
  'Welcome! Type something to write in the file. Type "exit" to stop.',
);

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    rl.close();
    writeStream.end();
  } else {
    writeStream.write(input + '\n');
    console.log('"' + input + '"' + ' just added to file! Keep going!');
    rl.prompt();
  }
});

process.on('beforeExit', () => {
  console.log('Process stopped , goodbye');
});
