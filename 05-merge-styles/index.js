const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const distFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(distFolder, 'bundle.css');
const writer = fs.createWriteStream(bundleFile);

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (path.extname(file.name) === '.css') {
        const reader = fs.createReadStream(path.join(stylesFolder, file.name), {
          encoding: 'utf8',
        });
        reader.pipe(writer);
      }
    });
  }
});
