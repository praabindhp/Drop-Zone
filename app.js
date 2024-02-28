const express = require('express');
const dotenv = require('dotenv');
const uploadRoutes = require('./routes/uploadRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
require('./config/firebaseConfig');
const app = express();
dotenv.config();

const directory = './downloads/';

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

// Use routes
app.use('/upload', uploadRoutes);
app.use('/download', downloadRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
