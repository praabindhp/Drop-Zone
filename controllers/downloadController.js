const storageService = require('../services/storageService');
const errorHandler = require('../utils/errorHandler');
const fs = require('fs');

const downloadController = async (req, res) => {
    try {
        const { filename } = req.query;

        if (!filename) {
            return errorHandler(res, 400, 'Filename Is Required');
        }

        const downloadStream = await storageService.download(filename);

        const directory = './downloads/';
        const writeStream = fs.createWriteStream(directory + filename);

        downloadStream.pipe(writeStream);

        writeStream.on('finish', () => {
            res.status(200).send('File Downloaded Successfully');
        });

        writeStream.on('error', (error) => {
            errorHandler(res, 500, error.message || 'Error Downloading File');
        });
    } catch (error) {
        errorHandler(res, 500, error.message || 'Error Downloading File');
    }
};

module.exports = downloadController;
