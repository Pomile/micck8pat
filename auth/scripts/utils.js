const fsExtra = require("fs-extra");
const path = require('path');
const fs = require('fs');

module.exports =  {
  copyFiles: async function copyFiles (destinationPath, sourcePath) {
  try {
    console.log( { destinationPath, sourcePath })
    if (!fsExtra.pathExists(destinationPath)) await fsExtra.mkdir(destinationPath);
    
    fs.readdirSync(sourcePath).forEach(mod => {
    const modulePath = path.join(sourcePath, mod);
    fs
    .readdirSync(modulePath)
    .filter(file => (file.indexOf('.') !== 0) && (file.includes('doc')) && (file.slice(-5) === '.yaml'))
    .forEach(async (file) => {
      const distModulePath = path.join(destinationPath, mod);
      console.log(distModulePath)
      await fsExtra.copy(`${modulePath}/${file}`, `${distModulePath}/${file}`)
      console.log(`copy ${file} successfully`);
    });
    });
    
  } catch (err) {
    console.error(err)
  }
}};
