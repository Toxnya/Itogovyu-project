module.exports = {
    emailConfig: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    },
    jwtSecret: 'wiw@la_v1ct0ri_wa$s$',
};


