import nodemailer from 'nodemailer';

const { NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_SECURE, NODEMAILER_USER, NODEMAILER_PASSWORD } = process.env

export const email = nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: NODEMAILER_PORT,
    secure: NODEMAILER_SECURE, //True para 465, false para as outras
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD
    } 
})

export async function sendEmail({ emailTo, subject, html, text }){
  const { accepted, rejected } = await email.sendMail({
    from: `Space Manager <${emailTo}>`,
    to: emailTo,
    subject,
    html,
    text
  })

  if (accepted) {
    return {
      send: true
    }
  }

  if (rejected) {
    return {
      send: false,
      rejected
    }
  }

}