const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    console.log('\nCurrent directory files:');
    if (err) console.log(`Error occured: ${err}`);
    else {
      files.forEach((file) => {
        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          (err, stats) => {
            if (err) {
              console.error(err);
              return;
            }
            if (!stats.isFile()) return;
            console.log(
              `${path.parse(file.name).name} - ${path
                .extname(file.name)
                .slice(1)} - ${stats.size} bytes`,
            );
          },
        );
      });
    }
  },
);
