const express = require('express');
const router = express.Router();
const {User,
       validateUpdateUser,
       validateUser,
       validateLogin} = require('../models/users');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');




/**
 * @desc Register a user
 * @param {string} username.body.required - username
 * @param {string} email.body.required - email
 * @param {string} password.body.required - password
 * @param {boolean} isAdmin.body - isAdmin
 * @return {object} 200 - Success message
 * 404 - Error message
 */

router.post('/register', asyncHandler(async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(404).json(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(404).json({
        status: 'failed',
        message: 'User already registered'
    });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);


    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    const result = await user.save();
    const token = jwt.sign(
        {
         id: user._id,
         isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        {expiresIn: '1d'});
        
    // passwords are not allowed to be returned
    const { password, ...data } = result._doc;

    res.status(200).json({
        status: 'success',
        message: 'User registered successfully',
        data: {...data, token}
    });
}));


/**
 * desc for logged in user
 * @param {string} email.body.required - email
 * @param {string} password.body.required - password
*/

router.post('/login', asyncHandler(async (req, res) => {

    const {error} = validateLogin(req.body);
    if(error) return res.status(404).json(error.details[0].message); 
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).json({
        status: 'failed',
        message: 'User not found'
    });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(404).json({
        status: 'failed',
        message: 'Invalid password'
    });

    const token = jwt.sign(
        {
         id: user._id,
         isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        {expiresIn: '1d'});

    // passwords, __v are not allowed to be returned
    const { password, _id, __v, ...data } = user._doc;

    res.status(200).json({
        status: 'success',
        message: 'Logged in successfully',
        data: { _id, ...data, token}
    });
}));














module.exports = router;