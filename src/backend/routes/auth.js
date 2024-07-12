const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { emailConfig } = require('../config');
const { generateToken, verifyToken } = require('../jwtService');
const { getUserByEmailOrUsername, createUser, updateUserUsername, updateUserPassword, getUserById} = require('../usersService');
const router = express.Router();

const transporter = nodemailer.createTransport(emailConfig);
let verificationCodes = {};

const authenticateToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error('JWT verification code:', err);
        return res.status(401).json({ auth: false, message: 'Failed to authenticate token'});
    }
};

router.post('/send-verification-code', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[email] = code;

    const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is ${code}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
        res.status(200).json({ message: 'Verification code sent.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending verification code.' });
    }
});

router.post('/send-reset-code', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        const user = await getUserByEmailOrUsername(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        verificationCodes[email] = code;

        const mailOptions = {
            from: emailConfig.auth.user,
            to: email,
            subject: 'Password Reset Code',
            text: `Your password reset code is ${code}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Password reset code sent to:', email);
        res.status(200).json({ message: 'Password reset code sent.' });
    } catch (error) {
        console.error('Error sending password reser code:', error);
        res.status(500).json({ error: 'Error sending password reset code.' });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password, verificationCode } = req.body;
    if (!email || !username || !password || !verificationCode) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (verificationCodes[email] !== verificationCode) {
        return res.status(401).json({ error: 'Invalid verification code.' });
    }

    try {
        const existingUser = await getUserByEmailOrUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const userId = await createUser(username, email, hashedPassword);

        const token = generateToken({ id: userId });
        delete verificationCodes[email];
        res.status(200).json({ auth: true, token: token, id: userId });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user.' });
    }
});

router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
        return res.status(400).json({ error: 'Username/email and password are required.' });
    }

    try {
        const user = await getUserByEmailOrUsername(usernameOrEmail);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid credentials." });
        }
        const token = generateToken({ id: user.id });
        res.status(200).json({ auth: true, token: token, id: user.id });
    } catch (err) {
        res.status(500).json({ error: "Error on the server" });
    }
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await getUserById(req.userId);
        if (!user) {
            return res.status(404).json({ auth: false, message: 'User not found.' });
        }
        res.status(200).json({ auth: true, username: user.username, email: user.email, password: user.password});
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ auth: false, message: 'Failed to fetch user data.' });
    }
});

router.post('/change-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.userId;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'All password fields are required.' });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'New passwords do not match.' });
    }

    try {
        const user = await getUserById(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ error: 'User not found.' });
        }

        const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isPasswordValid) {
            console.error('Invalid current password for user:', userId);
            return res.status(401).json({ error: 'Invalid current password.' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 8);
        const updateSuccess = await updateUserPassword(user.email, hashedPassword);
        if (updateSuccess) {
            res.status(200).json({ message: 'Password updated successfully.' });
        } else {
            console.error('Failed to update password for user:', userId);
            res.status(500).json({ error: 'Failed to update password.' });
        }
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ error: 'Failed to update password.' });
    }
});

router.post('/update-username', authenticateToken, async (req, res) => {
    const { currentPassword, newUsername } = req.body;
    const userId = req.userId;

    if (!currentPassword || !newUsername) {
        return res.status(400).json({ error: 'Current password and new username are required.' });
    }

    try {
        const user = await getUserById(userId);
        if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(401).json({ error: 'Invalid current password.' });
        }

        const updateSuccess = await updateUserUsername(user.email, newUsername);
        if (updateSuccess) {
            res.status(200).json({ message: 'Username updated successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to update username.' });
        }
    } catch (err) {
        console.error('Error updating username:', err);
        res.status(500).json({ error: 'Failed to update username.' });
    }
});


router.post('/update-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.userId;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'All password fields are required.' });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'New passwords do not match.' });
    }

    try {
        const user = await getUserById(userId);
        if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(401).json({ error: 'Invalid current password.' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 8);
        const updateSuccess = await updateUserPassword(user.email, hashedPassword);
        if (updateSuccess) {
            res.status(200).json({ message: 'Password updated successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to update password.' });
        }
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ error: 'Failed to update password.' });
    }
});

router.post('/reset-password', async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
    if (!email || !verificationCode || !newPassword) {
        return res.status(400).json({ error: 'Email, verification code, and new password are required' });
    }

    try {
        if (verificationCodes[email] !== verificationCode) {
            return res.status(401).json({ error: 'Invalid verification code.' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 8);
        const updateSuccess = await updateUserPassword(email, hashedPassword);
        if (updateSuccess) {
            delete verificationCodes[email];
            res.status(200).json({ message: 'Password updated successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to update password.' });
        }
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ error: 'Failed to reset password.' });
    }
});


router.post('/refresh-token', authenticateToken, async (req, res) => {
    const userId = req.userId;
    try {
        const token = generateToken({ id: userId });
        res.status(200).json({ auth: true, token: token });
    } catch (err) {
        console.error('Error refreshing token:', err);
        res.status(500).json({ auth: false, message: 'Failed to refresh token.' });
    }
});

module.exports = router;
