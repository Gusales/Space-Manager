import { hash } from "bcrypt";
import { sequelize, User } from "../lib/sequelize.js";
import { sendEmail } from '../lib/nodemailer.js'
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";
import { SearchUniqueUserByRM } from "./search-unique-user-by-rm.js";
import { createdNewUserTemplate } from "../http/templates/created-new-user.js";
import { SendEmailError } from "./errors/send-email-error.js";

export class Register{
  async execute({ name, email, password, rm,  telephone, active, actype }){
    await sequelize.sync()

    const searchUniqueUserByRM = new SearchUniqueUserByRM()
    const { user } = await searchUniqueUserByRM.execute({ rm })

    if (user) { 
      throw new UserAlreadyExistsError()
    }

    const createdUser = await User.create({
      rm,
      name,
      email,
      password: await hash(password, 6),
      telephone,
      active,
      actype
    })

    const isSendEmail = await sendEmail({
      emailTo: createdUser.email,
      html: createdNewUserTemplate(createdUser.name, createdUser.rm, password),
      subject: `${createdUser.name}, você foi adicionado ao Space Manager!`,
      text: 'Usuário, damos-lhe boas-vindas ao nosso sistema de gerenciamento de espaços: o Space Manager.'
    })

    if (isSendEmail.rejected) {
      throw new SendEmailError()
    }

    return { user: createdUser }
  }
}
