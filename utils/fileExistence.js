const fs = require('fs');

const directory = './downloads/';

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}