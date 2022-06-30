const mongoose = require('mongoose');

const registerUser = mongoose.Schema({
    firstName: {
        type:String,
        default: null,
    },
    middleName: {
        type:String,
        default: null,
    },
    lastName: {
        type:String,
        default: null,
    },
    emailId: {
        type:String,
        default: null,
    },
    password: {
        type:String,
    },
    token: {
        type:String,
    }
})

module.exports = mongoose.model("Registration", registerUser);
