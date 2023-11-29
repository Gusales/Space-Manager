import { sequelize, Space } from '../lib/sequelize.js'
import { SpaceNotFoundError } from './errors/space-not-found-error.js'

export class UpdateSpaceName {
  async execute({ id, name }) {
    await sequelize.sync()

    const space = await Space.findOne({
      where: {
        id
      }
    })

    if (!space) {
      throw new SpaceNotFoundError()
    }

    space.name = name;
    await space.save()

    return space
  }
}