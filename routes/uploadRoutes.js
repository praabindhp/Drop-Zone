const express = require('express');
const multerMiddleware = require('../middleware/multerMiddleware');
const uploadController = require('../controllers/uploadController');
const router = express.Router();

router.post('/', multerMiddleware.single('file'), uploadController);

module.exports = router;
