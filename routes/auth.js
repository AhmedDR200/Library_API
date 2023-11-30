const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * @desc Register a user
 * @param {string} username.body.required - username
 * @param {string} email.body.required - email
 * @param {string} password.body.required - password
 * @param {boolean} isAdmin.body - isAdmin
 * @return {object} 200 - Success message
 * 404 - Error message
 */

router.post('/register', registerUser);


/**
 * desc for logged in user
 * @param {string} email.body.required - email
 * @param {string} password.body.required - password
*/

router.post('/login', loginUser);




module.exports = router;