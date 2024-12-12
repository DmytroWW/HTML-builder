const fsPromises = require('fs/promises');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');

(async () => {
  try {
    const files = await fsPromises.readdir(stylesPath, { withFileTypes: true });
    const stylesArray = [];
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesPath, file.name);
        const data = await fsPromises.readFile(filePath, 'utf-8');
        stylesArray.push(data);
      }
    }
    await fsPromises.writeFile(outputPath, stylesArray.join('\n'));
  } catch (err) {
    console.error('Error:', err);
  }
})();
