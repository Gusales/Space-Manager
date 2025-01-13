import { compare } from 'bcrypt'
import { sequelize, User } from '../lib/sequelize.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { SearchUniqueUserByRM } from './search-unique-user-by-rm.js'
import { sendEmail } from '../lib/nodemailer.js'
import { firstLoginHtml } from '../http/templates/first-login.js'
import { SendEmailError } from './errors/send-email-error.js'

export class Authenticate{
  async execute({ rm, password }){
    await sequelize.sync()

    const searchUniqueUserByRM = new SearchUniqueUserByRM()
    const { user } = await searchUniqueUserByRM.execute({ rm })

    if (!user) { 
      throw new InvalidCredentialsError()
    }

    const isCorrectlyPassword = await compare(password, user.password)

    if (!isCorrectlyPassword) {
      throw new InvalidCredentialsError()
    }

    if (user.firstLoggin === true) {
      const sendMail = await sendEmail({
        emailTo: user.email,
        subject: 'Primeiro login na plataforma',
        html: firstLoginHtml(user.name, `${process.env.REDIRECT_URI}/pages/resetPassword.html`),
        text: `Olá ${user.name}! Verificamos que esse é o seu primeiro acesso a plataforma e gostariamos de informar que é possível alterar sua senha que foi lhe passada no momento do cadastro no sistema.`
      })

      if (!sendMail.send) {
        throw new SendEmailError()
      }

      user.firstLoggin = false
      await user.save()
    }

    return { user }
  }
}
