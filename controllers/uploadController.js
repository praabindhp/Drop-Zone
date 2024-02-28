const storageService = require('../services/storageService');
const errorHandler = require('../utils/errorHandler');

const uploadController = async (req, res) => {
    try {
        if (!req.file) {
            return errorHandler(res, 400, 'No File Uploaded');
        }

        const file = req.file;
        const destinationPath = `uploads/${file.originalname}`;

        await storageService.upload(file, destinationPath);

        res.status(200).send('File Uploaded Successfully');
    } catch (error) {
        errorHandler(res, 500, 'Error Uploading File');
    }
};

module.exports = uploadController;
