const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { response } = require('../Home/application');
const { MONGODB_URL } = process.env;

/**
 * here define success message and error message 
 * for an identify to be see db connection is properly working or not.
 */
const successMessage = "Mongo Database Connection established successfully";
const errorMessage = "We cannot established connection between backend and database";

/** 
 * Here Setup Connection using mongoose
 * Use @MONGODB_URL to setup connection between backend and database. 
 * Create Function for established connect between backend and database.
 */

exports.connect = async () => {
    await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log(successMessage)).catch((error) => {
        console.log(errorMessage);
    })
}