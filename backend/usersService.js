const bcrypt = require('bcryptjs');
const pool = require('./db');

const getUserByEmailOrUsername = async (usernameOrEmail) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [usernameOrEmail, usernameOrEmail]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const createUser = async (username, email, hashedPassword) => {
    try {
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, hashedPassword]);
        return result.rows[0].id;
    } catch (err) {
        throw err;
    }
};

const getUserById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}
const updateUserUsername = async (email, newUsername) => {
    try {
        const result = await pool.query('UPDATE users SET username = $1 WHERE email = $2 RETURNING id', [newUsername, email]);
        return result.rows.length > 0;
    } catch (err) {
        throw err;
    }
};

const updateUserPassword = async (email, hashedPassword) => {
    try {
        const result = await pool.query('UPDATE users SET password = $1 WHERE email = $2 RETURNING id', [hashedPassword, email]);
        return result.rows.length > 0;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getUserByEmailOrUsername,
    createUser,
    getUserById,
    updateUserUsername,
    updateUserPassword,
};
