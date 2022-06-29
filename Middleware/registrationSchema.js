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
    userName: {
        type:String,
        default: null,
    },
    password: {
        type:String,
        default: null,
    },
    token: {
        type: String,
        default: null,
    }
})

module.exports = mongoose.model("Registration", registerUser);
