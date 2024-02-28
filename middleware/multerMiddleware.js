const multer = require('multer');

const storage = multer.memoryStorage();
const multerMiddleware = multer({ storage });

module.exports = multerMiddleware;
