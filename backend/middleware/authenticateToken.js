const { verifyToken } = require('../service/jwtService');

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
        console.error('JWT verification error:', err);
        return res.status(401).json({ auth: false, message: 'Failed to authenticate token' });
    }
};

module.exports = authenticateToken;
