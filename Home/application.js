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
application.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
application.use(express.json());




module.exports = application;