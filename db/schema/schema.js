const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname not specified'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email not specified'],
        trim: true,
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    hashedPassword: {
        type: String,
        required: [true, 'Please Specify a password'],
    },
    gender: {
        type: String,
    },
    date_of_birth: {
        type: String,
    }
})

module.exports = mongoose.model('User', TaskSchema)