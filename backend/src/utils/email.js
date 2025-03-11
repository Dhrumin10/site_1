const nodemailer = require('nodemailer');
const logger = require('./logger');

const sendEmail = async (options) => {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        // Message object
        const message = {
            from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        // Send email
        const info = await transporter.sendMail(message);
        logger.info(`Email sent: ${info.messageId}`);

        return info;
    } catch (error) {
        logger.error('Email send error:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail; 