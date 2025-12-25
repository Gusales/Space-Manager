const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, //True para 465, false para as outras
    auth: {
        user: 'spacemanagergr@gmail.com',
        pass: 'fijmqknpppprminx'
    } 
})

module.exports = transport