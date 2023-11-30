const express = require('express');
const router = express.Router();
const { getForgotPassword,
       sendForgotPassword,
       getResetPassword,
       sendResetPassword } = require('../controllers/passwordController');


router.route('/forgot-password')
      .get(getForgotPassword)
      .post(sendForgotPassword);



router.route('/reset-password/:id/:token')
      .get(getResetPassword)
      .post(sendResetPassword);







module.exports = router;