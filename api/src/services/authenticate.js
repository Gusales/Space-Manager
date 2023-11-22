import { compare } from 'bcrypt'
import { sequelize, User } from '../lib/sequelize.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { SearchUniqueUserByRM } from './search-unique-user-by-rm.js'

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

    return { user }
  }
}
