const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    published: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('News', TaskSchema)