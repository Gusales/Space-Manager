import { sequelize, User } from '../lib/sequelize.js'
import { UserNotDesactivatedError } from './errors/user-not-desactivated-error.js'
import { UserNotFoundError } from './errors/user-not-found-error.js'

export class ReactiveUser {
  async execute({ id }){
    await sequelize.sync()

    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      throw new UserNotFoundError()
    }

    if (user.active === false) {
      user.active = true
      await user.save()

      return true
    }

    if (user.active === true) {
      throw new UserNotDesactivatedError()
    }
  }
}