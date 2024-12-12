const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    const files = await fsPromises.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const stats = await fsPromises.stat(filePath);
        const extension = path.extname(file.name).slice(1);
        const fileName = path.basename(file.name, path.extname(file.name));
        console.log(`${fileName} - ${extension} - ${stats.size} bytes`);
      }
    }
  } catch (err) {
    console.log('error:', err);
  }
})();
