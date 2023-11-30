const asyncHandler = require('express-async-handler');
const { User } = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports.getForgotPassword = asyncHandler((req, res, next) => {
    res.render('forgot-password');

});


module.exports.sendForgotPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({email: user.email, id: user._id},
          secret,
          {expiresIn: '1h'});

    const resetLink = `http://localhost:5000/reset-password/${user._id}/${token}`;

    res.json({
        message: 'Reset link sent to your email',
        data: {resetLink}
    })
});


module.exports.getResetPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;

    try {
        // Verify the token
        jwt.verify(req.params.token, secret);

        // Render the reset-password view with user email
        res.render('reset-password', { email: user.email });
    } catch (error) {
        // Handle invalid token
        res.status(400).json({ message: 'Invalid token' });
    }
});

module.exports.sendResetPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;

    try {
        // Verify the token
        jwt.verify(req.params.token, secret);

        // Generate a new hashed password
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.password, salt);

        // Update user password
        user.password = newPassword;
        await user.save();

        // Render success-password view
        res.render('success-password');
    } catch (error) {
        // Handle invalid token
        res.status(400).json({ message: 'Invalid token' });
    }
});



