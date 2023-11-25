import { hash } from "bcrypt";
import { User, sequelize } from "../lib/sequelize.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import { sendEmail } from "../lib/nodemailer.js";
import { resetPasswordHtml } from '../http/templates/reset-password.js'
import { SendEmailError } from "./errors/send-email-error.js";

export class PasswordReset {
  async execute({ id, password }) {
    await sequelize.sync()

    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      throw new InvalidCredentialsError()
    }

    user.password = await hash(password, 6)
    await user.save()

    const sendMail = await sendEmail({
      emailTo: user.email,
      subject: "Alteração de senha concluída",
      html: resetPasswordHtml(user.name),
      text: "Houve uma alteração na sua senha de usuário, caso você não tenha realizado essa mudança, entre em contato conosco mais rápido possível."
    })

    const { send } = sendMail

    if (sendMail.rejected) {
      throw new SendEmailError()
    }
    
    return { send }
  }
}