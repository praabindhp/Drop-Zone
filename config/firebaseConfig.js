const admin = require('firebase-admin');
const serviceAccount = require('../drop-zone-66019-firebase-adminsdk-ljhd4-4a861cafd6.json'); // Adjust the path accordingly

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'drop-zone-66019.appspot.com'
});
