const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://heroku_qr7t0t2q:s6hg1i9tasae0ckni8l7v2lmt2@ds127736.mlab.com:27736/heroku_qr7t0t2q'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
    .catch(error => console.error(`An error ocurred trying to connect to de database ${MONGODB_URI}`, error));
