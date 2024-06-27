const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config')

function generateToken(payload) {
    try {
        return jwt.sign(payload, jwtSecret, {expiresIn: '24h'});
    } catch (err) {
        console.log('JWT verification error:', err);
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        console.log('JWT verification error:', err);
        throw err;
    }
}

module.exports = {
    generateToken,
    verifyToken
}