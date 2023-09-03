const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    published: {
        type: String,
        required: [true, 'Date when published not provided']
    },
    author: {
        type: String,
        required: [true, 'Author not provided']
    },
    avatar: {
        type: String,
        required: [true, 'Avatar not provided']
    },
    title: {
        type: String,
        required: [true, 'Title not provided']
    },
    background: {
        type: String,
        required: [true, 'Background not provided']
    },
    subtitle: {
        type: String,
        required: [true, 'Subtitle not provided']
    },
    category: {
        type: String,
        required: [true, 'Category not provided']
    }
})

module.exports = mongoose.model('News', TaskSchema)