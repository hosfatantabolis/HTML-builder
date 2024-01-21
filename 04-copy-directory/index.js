const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) console.log(err);
  fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    if (err)
      console.log(`Error occured when removing files from directory: ${err}`);
    else {
      files.forEach((file) => {
        fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
          if (err) console.log(err);
        });
      });
    }
  });
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) console.log(`Error occured when reading directory: ${err}`);
    else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'files', file),
          path.join(__dirname, 'files-copy', file),
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
