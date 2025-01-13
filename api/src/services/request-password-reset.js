import { createToken } from "../utils/token.js"
import { sendEmail } from "../lib/nodemailer.js"
import { sequelize } from "../lib/sequelize.js"
import { SearchUniqueUserByRM } from "./search-unique-user-by-rm.js"
import { recoverPasswordHtml } from "../http/templates/recover-password.js"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js"
import { SendEmailError } from "./errors/send-email-error.js"

export class RequestPasswordReset {
  async execute({ rm }) {
    await sequelize.sync()
    const searchUniqueUserByRM = new SearchUniqueUserByRM()
    const { user } = await searchUniqueUserByRM.execute({ rm })

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const oneHour = 60 * 60 * 1
    const token = createToken({ 
      sub: user.id,
      name: user.name,
      expiresIn: oneHour,
    })

    const redirectUrl = new URL(`http://localhost:5500/pages/recoverPassword.html?token=${token}`)
    const sendMail = await sendEmail({
      emailTo: user.email,
      subject: 'Solicitação para redefinição de Senha',
      html: recoverPasswordHtml(user.name, redirectUrl),
      text: `Houve uma solicitação para redefinição de senha da sua conta do Space Manager ${user.name}!`
    })

    if (!sendMail.send) {
      throw new SendEmailError()
    }

    return {
      message: "Enviamos um email para o endereço cadastrado no sistema. Por favor, confira sua caixa de entrada."
    }
  }
}