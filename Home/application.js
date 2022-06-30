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

let registerPayload = require('../Middleware/registrationSchema');

/**
 * Here Called BycrptJS module for end to end encryption.
 * let's call jwt for authentication basis on UI.
 */
const bycrpt = require('bcryptjs');
const AuthToken = require('jsonwebtoken');

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
    const { firstName, middleName, lastName, emailId, password } = req.body;

        const existEmail = await registerPayload.findOne({ emailId });
        if (existEmail?.emailId == emailId) 
        {
            res.status(400).send("User Already exist!");
        }
        else if (existEmail?.emailId != emailId) {
            const encryptedPassword = await bycrpt.hash(password, 10);
            registerPayload = registerPayload.create({
                firstName,
                middleName,
                lastName,
                emailId: emailId,
                password: encryptedPassword
            });
            const token = AuthToken.sign(
                { user_id: registerPayload._id, emailId },
                process.env.SECRET_KEY,
                { expiresIn: "2h" }
            )
            registerPayload.token = token;
            registerPayload.password = undefined;
            res.status(201).send({ "data": req.body, "message": "User Registered Successfully" });
        }
})

application.post('/login', async (req, res) => {
    const { emailId, password } = req.body;

    const existingUser = await registerPayload.findOne({emailId: emailId});
    
    if(existingUser != null) {
        if(existingUser.emailId && bycrpt.compare(existingUser.password, password)) {
            const token = AuthToken.sign(
                { user_id: registerPayload._id, emailId },
                process.env.SECRET_KEY,
                { expiresIn: "2h" }
            )
            registerPayload.token = token;
            registerPayload.password = undefined
            res.status(200).send({"message": "User has successfully login!"});
        } 
        else {
            res.status(400).send("EmailId and Password are unauthorized");
        }
    }
    else if(existingUser == null) {
        res.status(401).send("You are not register in our System.");
    }
})



/**
 * Export a whole application application.js file.
 */
module.exports = application;