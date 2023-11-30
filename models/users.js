const mongoose = require('mongoose');
const joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 130,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// User Model
const User = mongoose.model('User', userSchema);

// Validate Register User
function validateUser(user) {
    const schema = joi.object({
        username: joi.string().min(3).max(130).required(),
        email: joi.string().min(5).max(150).required().email(),
        password: joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
}

// Validate Login User
function validateLogin(user) {
    const schema = joi.object({
        email: joi.string().min(5).max(150).required().email(),
        password: joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
}

// Validate Update User
function validateUpdateUser(user) {
    const schema = joi.object({
        username: joi.string().min(3).max(130),
        email: joi.string().min(5).max(150).email(),
        password: joi.string().min(5).max(1024)
    });

    return schema.validate(user);
}

// Export
module.exports = {
    User,
    validateUser,
    validateLogin,
    validateUpdateUser
};
