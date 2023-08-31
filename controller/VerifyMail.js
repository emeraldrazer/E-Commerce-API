const nodemailer = require('nodemailer');
const User = require('../db/schema/schema');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Sendinblue',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

const sendVerificationEmail = async (email, verificationToken) => {
    const mailOptions = {
        from: 'noreply@ecommerce.com',
        to: email,
        subject: 'Email Verification',
        text: `<h2>Please click the following link to verify your email address: <a href='http://localhost:3001/api/v1/verify/${verificationToken}'>Verify Email</a></h2>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

const verifyEmail = async function (req, res) {
    
    let decodedEmail = req.user.signed;

    const updateEmailVerification = {
        $set: {email_verified: true}
    }

    const user = await User.updateOne({ email: decodedEmail }, updateEmailVerification, {new: true, runValidators: true})

    if (!user) {
        return res.status(404).json({ err: true, msg: 'No user found' })
    }

    return res.status(200).json({ err: false, msg: 'Email Successfully verified' })
}



module.exports = { sendVerificationEmail, verifyEmail }