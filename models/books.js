const mongoose = require('mongoose');
const joi = require('joi');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    price: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    cover: {
        type: String,
        required: true,
        enum: ['soft', 'hard']
    }
});

const Book = mongoose.model('Book', bookSchema);


// Validate create book
function validateBook(book){
    const schema = joi.object({
        title: joi.string().trim().min(3).max(200).required(),
        author: joi.string().min(3).max(500).required(),
        price: joi.number().min(0).required(),
        rating: joi.number().min(1).max(5).required(),
        cover: joi.string().valid('soft', 'hard').required()
    });

    return schema.validate(book);
}

// Validate update book
function validateUpdateBook(book){
    const schema = joi.object({
        title: joi.string().trim().min(3).max(200),
        author: joi.string().min(3).max(500),
        price: joi.number().min(0),
        rating: joi.number().min(1).max(5),
        cover: joi.string().valid('soft', 'hard')
    });

    return schema.validate(book);
}

module.exports = {
    Book,
    validateBook,
    validateUpdateBook
};
