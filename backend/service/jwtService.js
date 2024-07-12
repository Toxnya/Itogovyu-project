const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config/config')
const { getUserById } = require('./usersService');

function generateToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

async function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        const user = await getUserById(decoded.id);
        if (!user) {
            return res.status(404).json({ auth: false, message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ auth: false, message: 'Failed to authenticate token' });
    }
}


module.exports = {
    generateToken,
    verifyToken,
    authenticateToken,
}