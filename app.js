const express = require('express');
const dotenv = require('dotenv');

const uploadRoutes = require('./routes/uploadRoutes');
const downloadRoutes = require('./routes/downloadRoutes');

require('./config/firebaseConfig');
const cors = require('cors');
const app = express();
app.use(cors());

dotenv.config();
require('./utils/fileExistence');

// Use Routes
app.use('/upload', uploadRoutes);
app.use('/download', downloadRoutes);
app.get('/', (req, res) => {
    res.send(`Howdy 🥷, Welcome To Praabindh's ⚓ Server`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Praabindh's Server ⚓ Is Running On Port ${port}`);
});
