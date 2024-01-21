const fs = require('fs');
const path = require('path');

const outputFolder = path.join(__dirname, 'files-copy');
const inputFolder = path.join(__dirname, 'files');

fs.mkdir(outputFolder, { recursive: true }, (err) => {
  if (err) console.log(err);
  fs.readdir(outputFolder, (err, files) => {
    if (err)
      console.log(`Error occured when removing files from directory: ${err}`);
    else {
      files.forEach((file) => {
        fs.unlink(path.join(outputFolder, file), (err) => {
          if (err) console.log(err);
        });
      });
    }
  });
  fs.readdir(inputFolder, (err, files) => {
    if (err) console.log(`Error occured when reading directory: ${err}`);
    else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(inputFolder, file),
          path.join(outputFolder, file),
          (err) => {
            if (err)
              console.log(
                `Error occured when copying files to directory: ${err}`,
              );
          },
        );
      });
    }
  });
});
