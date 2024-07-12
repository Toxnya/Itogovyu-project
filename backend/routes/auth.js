const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken, authenticateToken } = require('../service/jwtService');
const mailService = require('../service/MailService')
const { getUserByEmailOrUsername, createUser, updateUserUsername, updateUserPassword, getUserById} = require('../service/usersService');
const { check, validationResult } = require('express-validator')


const router = express.Router();

router.post('/send-verification-code', [
    check('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const code = mailService.generateVerificationCode(email);

    try {
        await mailService.sendVerificationCode(email, code);
        res.status(200).json({ message: 'Verification code sent.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/register', [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('verificationCode').notEmpty().withMessage('Verification code is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, verificationCode } = req.body;
    if (!mailService.verifyCode(email, verificationCode)) {
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
        mailService.removeVerificationCode(email);
        res.status(200).json({ auth: true, token, id: userId });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user.' });
    }
});

router.post('/login', [
    check('usernameOrEmail').notEmpty().withMessage('Username/email is required'),
    check('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usernameOrEmail, password } = req.body;

    try {
        const user = await getUserByEmailOrUsername(usernameOrEmail);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = generateToken({ id: user.id });
        res.status(200).json({ auth: true, token, id: user.id });
    } catch (err) {
        res.status(500).json({ error: 'Error on the server' });
    }
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ auth: true, username: user.username, email: user.email });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ auth: false, message: 'Failed to fetch user data.' });
    }
});

router.post('/change-password', authenticateToken, [
    check('currentPassword').notEmpty().withMessage('Current password is required'),
    check('newPassword').notEmpty().withMessage('New password is required'),
    check('confirmNewPassword').notEmpty().withMessage('Confirm new password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'New passwords do not match.' });
    }

    try {
        const user = req.user;

        const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isPasswordValid) {
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

router.post('/update-username', authenticateToken, [
    check('currentPassword').notEmpty().withMessage('Current password is required'),
    check('newUsername').notEmpty().withMessage('New username is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newUsername } = req.body;

    try {
        const user = req.user;

        const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isPasswordValid) {
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

router.post('/reset-password', [
    check('email').isEmail().withMessage('Valid email is required'),
    check('verificationCode').notEmpty().withMessage('Verification code is required'),
    check('newPassword').notEmpty().withMessage('New password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, verificationCode, newPassword } = req.body;
    if (!mailService.verifyCode(email, verificationCode)) {
        return res.status(401).json({ error: 'Invalid verification code.' });
    }

    try {
        const hashedPassword = bcrypt.hashSync(newPassword, 8);
        const updateSuccess = await updateUserPassword(email, hashedPassword);
        if (updateSuccess) {
            mailService.removeVerificationCode(email);
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
    const userId = req.user.id;
    try {
        const token = generateToken({ id: userId });
        res.status(200).json({ auth: true, token: token });
    } catch (err) {
        console.error('Error refreshing token:', err);
        res.status(500).json({ auth: false, message: 'Failed to refresh token.' });
    }
});

module.exports = router;