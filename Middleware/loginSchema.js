const mongoose = require('mongoose');

const loginUser = mongoose.Schema({
    userName: {
        type:String,
        default: null,
    },
    password: {
        type:String,
        default: null,
    },
})

module.exports = mongoose.model("Login", loginUser);
