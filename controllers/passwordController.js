const asyncHandler = require('express-async-handler');
const { User } = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


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

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Reset your password',
        html: ` <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
            
                    h1 {
                        color: #333333;
                    }
            
                    p {
                        color: #555555;
                    }
            
                    a {
                        color: #007BFF;
                        text-decoration: none;
                    }
            
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Reset</h1>
                <p>Hello,</p>
                <p>We received a request to reset your password. Click the link below to proceed:</p>
                <p><a href="${resetLink}">${resetLink}</a></p>
                <p>If you didn't request a password reset, please ignore this email.</p>
                <p>Thank you!</p>
            </div>
        </body>
        </html>
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            // Handle the error, e.g., return an error response to the client.
            return res.status(500).json({ error: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            // Optionally, you can send a success response to the client.
            res.render('link-send');
        }
    });
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



