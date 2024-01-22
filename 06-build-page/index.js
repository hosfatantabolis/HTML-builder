const fs = require('fs');
const path = require('path');

const outputFolder = path.join(__dirname, 'project-dist');
const stylesFolder = path.join(__dirname, 'styles');
const componentsFolder = path.join(__dirname, 'components');
const assetsInputFolder = path.join(__dirname, 'assets');
const assetsOutputFolder = path.join(outputFolder, 'assets');

const bundleFile = path.join(outputFolder, 'style.css');
const bundleHTMLFile = path.join(outputFolder, 'index.html');
const styleWriter = fs.createWriteStream(bundleFile);

const handleError = (err) => {
  if (err) console.log(err);
};

const checkForExistingFiles = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err)
      console.log(`Error occured when removing files from directory: ${err}`);
    else {
      files.forEach((file) => {
        fs.unlink(path.join(dir, file), (err) => {
          if (err) console.log(err);
        });
      });
    }
  });
};

const copyFolder = (from, to) => {
  fs.readdir(from, (err, files) => {
    handleError(err);

    files.forEach((file) => {
      fs.stat(path.join(from, file), (err, stats) => {
        if (err) handleError(err);
        if (stats.isDirectory()) {
          checkForExistingFiles(path.join(to, file));
          fs.mkdir(path.join(to, file), { recursive: true }, (err) => {
            handleError(err);
            copyFolder(path.join(from, file), path.join(to, file));
          });
        } else {
          copyFile(path.join(from, file), path.join(to, file));
        }
      });
    });
  });
};

const copyFile = (from, to) => {
  fs.copyFile(from, to, (err) => handleError(err));
};

const bundleStyles = () => {
  fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
    handleError(err);

    files.forEach((file) => {
      if (path.extname(file.name) === '.css') {
        const styleReader = fs.createReadStream(
          path.join(stylesFolder, file.name),
          {
            encoding: 'utf8',
          },
        );
        styleReader.pipe(styleWriter);
      }
    });
  });
};

const bundleHTML = () => {
  const HTMLReader = fs.createReadStream(
    path.join(__dirname, 'template.html'),
    {
      encoding: 'utf8',
    },
  );
  fs.readdir(componentsFolder, (err, files) => {
    HTMLReader.on('data', (data) => {
      let indexFile = data.toString();
      files.forEach((file) => {
        const fullPath = path.join(componentsFolder, file);
        const fileContents = fs.createReadStream(fullPath, {
          encoding: 'utf8',
        });
        if (path.extname(file) === '.html') {
          fileContents.on('data', (cont) => {
            indexFile = indexFile.replaceAll(
              `{{${path.parse(fullPath).name}}}`,
              `${cont}`,
            );
            fs.writeFile(bundleHTMLFile, indexFile, (err) => handleError(err));
          });
        }
      });
    });
  });
};

fs.mkdir(outputFolder, { recursive: true }, (err) => {
  handleError(err);
  copyFolder(assetsInputFolder, assetsOutputFolder);
  bundleStyles();
  bundleHTML();
});
