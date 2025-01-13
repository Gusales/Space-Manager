import nodemailer from 'nodemailer';

const { NODEMAILER_USER, NODEMAILER_PASSWORD } = process.env

export const email = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD
    } 
})

export async function sendEmail({ emailTo, subject, html, text }){
  const { accepted, rejected } = await email.sendMail({
    from: `Space Manager <${NODEMAILER_USER}>`,
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