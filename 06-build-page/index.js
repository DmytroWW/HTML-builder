const fs = require('fs/promises');
const path = require('path');

const projectDistPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');

(async () => {
  try {
    await fs.mkdir(projectDistPath, { recursive: true });
    let templateContent = await fs.readFile(templatePath, 'utf-8');
    const componentFiles = await fs.readdir(componentsPath);

    for (const componentFile of componentFiles) {
      const componentName = path.basename(componentFile, '.html');
      const componentTag = `{{${componentName}}}`;

      if (templateContent.includes(componentTag)) {
        const componentContent = await fs.readFile(
          path.join(componentsPath, componentFile),
          'utf-8',
        );
        templateContent = templateContent.replace(
          componentTag,
          componentContent,
        );
      }
    }

    await fs.writeFile(
      path.join(projectDistPath, 'index.html'),
      templateContent,
    );

    const styleFiles = await fs.readdir(stylesPath);
    const stylesArray = [];

    for (const styleFile of styleFiles) {
      if (path.extname(styleFile) === '.css') {
        const styleContent = await fs.readFile(
          path.join(stylesPath, styleFile),
          'utf-8',
        );
        stylesArray.push(styleContent);
      }
    }

    await fs.writeFile(
      path.join(projectDistPath, 'style.css'),
      stylesArray.join('\n'),
    );

    const distAssetsPath = path.join(projectDistPath, 'assets');
    await copyAssets(assetsPath, distAssetsPath);

    console.log('Its done!');
  } catch (err) {
    console.error('Error:', err);
  }
})();

async function copyAssets(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  await fs.mkdir(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyAssets(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}
