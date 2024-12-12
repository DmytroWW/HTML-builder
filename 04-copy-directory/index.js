const path = require('path');
const fsPromises = require('fs/promises');

const srcPath = path.join(__dirname, 'files');
const distPath = path.join(__dirname, 'files-copy');

(async () => {
  try {
    const files = await fsPromises.readdir(srcPath);
    await fsPromises.rm(distPath, { recursive: true, force: true });
    await fsPromises.mkdir(distPath, { recursive: true });
    for (const file of files) {
      const srcFile = path.join(srcPath, file);
      const distFile = path.join(distPath, file);
      await fsPromises.copyFile(srcFile, distFile);
    }
  } catch (err) {
    console.log('Error:', err);
  }
})();
