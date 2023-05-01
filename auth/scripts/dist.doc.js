const path = require('path');
const { copyFiles } = require('./utils');

const sourcePath = path.join(__dirname, "../src/modules")
const destination = path.join(__dirname, "../dist/modules");

copyFiles(destination, sourcePath);

