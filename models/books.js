
const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/login');




const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    },

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;