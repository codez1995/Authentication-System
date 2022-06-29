/** 
 * calling env file 
 */
require('dotenv').config();
/** 
* Calling database connectivity file 
*/
require('../DatabaseConfig/dbConfiguration').connect();


let express = require('express');
let application = express();

/**
 * Here Called all things 
 * related to swagger UI which help to test all API on swagger
 * after this we does not need Postman for testing API'S
 */
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./Home/swagger.yaml');
application.use('/swagger-Docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
application.use(express.json());

/** 
 * Here Called
 * two schemas
 * name are Login Schema and Register Schema
 */

let loginPayload = require('../Middleware/loginSchema');
let registerPayload = require('../Middleware/registrationSchema');

/**
 * Here Called BycrptJS module for end to end encryption.
 */
const bycrpt = require('bcryptjs');

/**
 * ============================================================
 * LET'S START TO BUILD ROUTES FOR GETTING DATA ON ROUTE BASIS
 * ============================================================
 */

/**
 * =====================================
 * FIRST BUILD REGISTER ROUTE FOR
 * REGISTERING A USER
 * =====================================
 */

application.post('/register', async (req, res) => {
    const {firstName, middleName, lastName, userName, password} = req.body;
    const emailId = userName.toLowerCase();
    const existEmail = await registerPayload.findOne({emailId});
    if(firstName != null && lastName != null && userName != null && password != null) {
        if(existEmail.userName === userName) {
            res.status(400).send("User Already exist!");
        }
        else {
            res.status(200).send({"data":req.body, "message": "User Registered Successfully"})
        }
    }
    else {
        res.status(401).send("All fields are required!");
    }

    /**
     * Encrpt Password of User
     */
    const encryptedPassword = await bycrpt.hash(password, 10);

    registerPayload = registerPayload.create({
        firstName,
        middleName,
        lastName,
        userName: userName.toLowerCase(),
        password: encryptedPassword
    });

    registerPayload.password = undefined;
    res.status(201).json(registerPayload);
})



/**
 * Export a whole application index.js file.
 */

module.exports = application;