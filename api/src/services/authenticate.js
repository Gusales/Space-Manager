import { compare } from 'bcrypt'
import { sequelize, users } from '../lib/sequelize.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

export class Authenticate{
  async execute({ rm, password }){
    await sequelize.sync()

    let user = await users.findOne({
      where: {
        rm
      }
    })

    if (!user) { 
      throw new InvalidCredentialsError()
    }

    const isCorrectlyPassword = await compare(password, user.password)

    if (!isCorrectlyPassword) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}