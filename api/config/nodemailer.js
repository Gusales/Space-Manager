const nodemailer = require('nodemailer');

const { NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_SECURE, NODEMAILER_USER, NODEMAILER_PASSWORD } = process.env

module.exports = nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: NODEMAILER_PORT,
    secure: NODEMAILER_SECURE, //True para 465, false para as outras
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD
    } 
})