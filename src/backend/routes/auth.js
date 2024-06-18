const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const pool = require('../db');
const router = express.Router();

require('dotenv').config();

const secret = process.env.JWT_SECRET || 'wiw@la_v1ct0ri_wa$s$';

let verificationCodes = {};

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post('/send-verification-code', async (req, res) => {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    verificationCodes[email] = code;

    const mailOptions = {
        from: process.env.EMAIL_USER,
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

router.post('/register', async (req, res) => {
    const { username, email, password, verificationCode } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    if (verificationCodes[email] !== verificationCode) {
        return res.status(401).json({ error: 'Invalid verification code.' });
    }

    try {
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]
        );
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists.' });
        }

        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );
        const token = jwt.sign({ id: result.rows[0].id }, secret, { expiresIn: 86400 });
        delete verificationCodes[email];
        res.status(200).json({ auth: true, token: token, id: result.rows[0].id });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user.' });
    }
});

router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $1', [usernameOrEmail]
        );
        const user = result.rows[0];
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid credentials." });
        }
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
        res.status(200).json({ auth: true, token: token, id: user.id });
    } catch (err) {
        res.status(500).json({ error: "Error on the server" });
    }
});

router.get('/me', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        res.status(200).json({ auth: true, id: decoded.id });
    });
});

router.post('/refresh-token', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ auth: false, message: 'Token expired' });
            }
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        }
        const newToken = jwt.sign({ id: decoded.id }, secret, { expiresIn: 86400 });
        res.status(200).json({ auth: true, token: newToken });
    });
});

module.exports = router;