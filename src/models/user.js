const mangoose = require('mongoose');

const userSchema = new mangoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
    },
});

const User = mangoose.model('User', userSchema);

module.exports = User;