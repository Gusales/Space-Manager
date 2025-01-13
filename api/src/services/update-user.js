import { User, sequelize } from '../lib/sequelize.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'
import { UserNotFoundError } from './errors/user-not-found-error.js'

export class UpdateUser {
  async execute({ id, name, email, rm, telephone, actype }){
    await sequelize.sync()

    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      throw new UserNotFoundError()
    }

    const userIfSameRM = await User.findOne({
      where: {
        rm
      }
    })

    if (userIfSameRM && userIfSameRM.rm !== user.rm) {
      throw new UserAlreadyExistsError()
    }

    user.name = name;
    user.rm = rm;
    user.email = email;
    user.telephone = telephone;
    user.actype = actype;

    await user.save()

    return { user }
  }
}