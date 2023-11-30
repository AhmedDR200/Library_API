const express = require('express');
const router = express.Router();
const { User, validateUpdateUser } = require('../models/users');
const { verifyToken, authorization, verifyTokenIsAdmin } = require('../middlewares/verifyToken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');



// Get All Users

/**
 * Get all users from the database
 * @param { Object } params Parameters for request
*/

router.get('/users', verifyTokenIsAdmin, asyncHandler(async (req, res) => {
    const users = await User.find().select('-password -__v');
    res.status(200).json({ status: 'success', data: { users } });
}
));


// Get user by id

/**
 * Get user by id from the database
 * @param { Object } params Parameters for request
 * @param { Object } params.id Id of the user
*/

router.get('/users/:id', authorization, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (user) {
        res.status(200).json({ status: 'success', data: { user } });
    } else {
        res.status(404).json({ status: 'fail', message: 'User not found' });
    }
}));


// Delete user by id

/**
 * Delete user by id from the database
 * @param { Object } params Parameters for request
 * @param { Object } params.id Id of the user
*/

router.delete('/users/:id', authorization, asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id).select('-password -__v');
    if (user) {
        res.status(200).json({ status: 'success', message: 'User deleted successfully' });
    } else {
        res.status(404).json({ status: 'fail', message: 'User not found' });
    }
}));


// Update user

/**
 * /users/{id}: Update user by id
 * put: update user by id
 * description: update user by id
 */

router.put('/users/:id', authorization, asyncHandler(async (req, res) => {

    const { error } = validateUpdateUser(req.body);
    if (error) return res.status(400).json({ status: 'fail', message: error.details[0].message });


    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
    },
     { new: true }).select('-password -__v');


    if (updatedUser) {
        res.status(200).json({ status: 'success', data: { user: updatedUser } });
    } else {
        res.status(404).json({ status: 'fail', message: 'User not found' });
    }
}));




module.exports = router;