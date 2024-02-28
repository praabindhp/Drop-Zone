const admin = require('firebase-admin');

const storageService = {
    upload: async (file, destinationPath) => {
        const bucket = admin.storage().bucket();
        const uploadStream = bucket.file(destinationPath).createWriteStream();
        uploadStream.end(file.buffer);

        return new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });
    },

    download: async (filename) => {
        const bucket = admin.storage().bucket();
        const file = bucket.file(`uploads/${filename}`);
        const [exists] = await file.exists();

        if (!exists) {
            throw new Error('File not found');
        }

        const downloadStream = file.createReadStream();
        return downloadStream;
    },
};

module.exports = storageService;
