import { sequelize, User } from '../lib/sequelize.js'
import { UserNotFoundError } from './errors/user-not-found-error.js'

export class DeleteUser {
  async execute({ id }) {
    await sequelize.sync()

    let user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      throw new UserNotFoundError()
    }

    if (user.active === true) {
      user.active = false
      await user.save()

      return { desactivated: true }
    }

    if (user.active === false) {
      await user.destroy()

      return { deleted: true }
    }
  }
}