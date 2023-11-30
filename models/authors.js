const mongoose = require('mongoose');
const joi = require('joi');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    age: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    nationality: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    image: {
        type: String,
        required: true,
        default: 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
    }
},
{
    timestamps: true
});

const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author){
    const schema = joi.object({
        name: joi.string().min(3).required(),
        age: joi.number().required(),
        nationality: joi.string().min(3).required(),
        image: joi.string()
    });
    return schema.validate(author);
}

function validateUpdateAuthor(author){
    const schema = joi.object({
        name: joi.string().min(3),
        age: joi.number(),
        nationality: joi.string().min(3),
        image: joi.string()
    });
    return schema.validate(author);
}

module.exports = {
    Author,
    validateAuthor,
    validateUpdateAuthor
};