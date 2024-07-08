const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/config');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport(emailConfig);
        this.verificationCodes = {};
    }

    generateVerificationCode(email) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.verificationCodes[email] = code;
        return code;
    }

    async sendVerificationCode(email, code) {
        const mailOptions = {
            from: emailConfig.auth.user,
            to: email,
            subject: 'Your verification code',
            text: `Your verification code is ${code}`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Error sending verification code.');
        }
    }

    verifyCode(email, code) {
        return this.verificationCodes[email] === code;
    }

    removeVerificationCode(email) {
        delete this.verificationCodes[email];
    }
}

module.exports = new MailService();