const fs = require('fs');
const path = require('path');
const readline = require('readline');

const goodbye = () => {
  rl.close();
  console.log('\nBye!');
};

console.log('Enter some text:');
const writer = fs.createWriteStream(path.join(__dirname, 'output.txt'), ['a']);
let rl = readline.createInterface(process.stdin, writer);
process.on('SIGINT', goodbye);

rl.on('line', (text) => {
  if (text.toLowerCase() === 'exit') {
    goodbye();
  } else {
    writer.write(text + '\n');
  }
});
