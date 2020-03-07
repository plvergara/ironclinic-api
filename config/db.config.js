const mongoose = require('mongoose');
const MONGODB_URI = env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
    .catch(error => console.error(`An error ocurred trying to connect to de database ${MONGODB_URI}`, error));
