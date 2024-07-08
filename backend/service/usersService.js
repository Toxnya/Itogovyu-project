const pool = require('../repository/db');

async function getUserByEmailOrUsername(usernameOrEmail) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [usernameOrEmail, usernameOrEmail]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

async function createUser(username, email, hashedPassword) {
    try {
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, hashedPassword]);
        return result.rows[0].id;
    } catch (err) {
        throw err;
    }
}

async function updateUserUsername(email, newUsername) {
    try {
        const result = await pool.query('UPDATE users SET username = $1 WHERE email = $2 RETURNING id', [newUsername, email]);
        return result.rows.length > 0;
    } catch (err) {
        throw err;
    }
}

async function updateUserPassword(email, hashedPassword) {
    try {
        const result = await pool.query('UPDATE users SET password = $1 WHERE email = $2 RETURNING id', [hashedPassword, email]);
        return result.rows.length > 0;
    } catch (err) {
        throw err;
    }
}

async function getUserById(id) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getUserByEmailOrUsername,
    createUser,
    updateUserUsername,
    updateUserPassword,
    getUserById,
};
