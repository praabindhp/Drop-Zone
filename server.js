const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./drop-zone-66019-firebase-adminsdk-ljhd4-4a861cafd6.json');
const fs = require('fs');
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'drop-zone-66019.appspot.com'
});

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const directory = './downloads/';

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No File Uploaded');
        }

        const file = req.file;
        const bucket = admin.storage().bucket();
        const destinationPath = `uploads/${file.originalname}`;

        const uploadStream = bucket.file(destinationPath).createWriteStream();

        uploadStream.end(file.buffer);

        await new Promise((resolve, reject) => {
            uploadStream.on('finish', () => {
                resolve();
            });

            uploadStream.on('error', (error) => {
                reject(error);
            });
        });

        res.status(200).send('File Uploaded Successfully');
    } catch (error) {
        console.error('Error Uploading File : ', error);
        res.status(500).send('Error Uploading File');
    }
});

app.get('/download', async (req, res) => {
    try {
        const { filename } = req.query;
        if (!filename) {
            return res.status(400).send('Filename Is Required');
        }

        const bucket = admin.storage().bucket();
        const file = bucket.file(`uploads/${filename}`);

        const [exists] = await file.exists();
        if (!exists) {
            return res.status(404).send('File Not Found');
        }

        const downloadStream = file.createReadStream();

        const directory = './downloads/';

        const writeStream = fs.createWriteStream(directory + filename);

        downloadStream.pipe(writeStream);

        writeStream.on('finish', () => {
            res.status(200).send('File Downloaded Successfully');
        });

        writeStream.on('error', (error) => {
            console.error('Error Downloading File : ', error);
            res.status(500).send('Error Downloading File');
        });
    } catch (error) {
        console.error('Error Downloading File : ', error);
        res.status(500).send('Error Downloading File');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Praabindh's Server ⚓ Is Running On Port ~ ${port}`);
});
