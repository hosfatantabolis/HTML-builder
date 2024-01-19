const fs = require('fs');
const path = require('path');

const reader = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf8',
});

reader.on('data', (data) => {
  console.log(data);
});
