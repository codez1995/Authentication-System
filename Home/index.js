/** 
 * Calling Port
 * which help to run backend application
 * on particular port
 */
const PORT = process.env;

/** 
 * Call application.js file which have contain many things 
 * likes some routes which work with database.
 */

const application = require('./application');


/** calling a server to be start backend applications */

application.listen(PORT.PORT, async () => {
    await console.log("Backend Application start successfully on port " + PORT.PORT);
})