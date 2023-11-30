const express = require('express');
const router = express.Router();
const { verifyToken, authorization, verifyTokenIsAdmin } = require('../middlewares/verifyToken');
const { getAllUsers,
        getSingleUser,
        deleteUser,
        updateUser } = require('../controllers/userController');




// Get All Users

/**
 * Get all users from the database
 * @param { Object } params Parameters for request
*/

router.get('/users', verifyTokenIsAdmin, getAllUsers);


// Get user by id

/**
 * Get user by id from the database
 * @param { Object } params Parameters for request
 * @param { Object } params.id Id of the user
*/

router.get('/users/:id', authorization, getSingleUser);


// Delete user by id

/**
 * Delete user by id from the database
 * @param { Object } params Parameters for request
 * @param { Object } params.id Id of the user
*/

router.delete('/users/:id', authorization, deleteUser);


// Update user

/**
 * /users/{id}: Update user by id
 * put: update user by id
 * description: update user by id
 */

router.put('/users/:id', authorization, updateUser);




module.exports = router;