import { sequelize, Space } from '../lib/sequelize.js'
import { SpaceAlreadyExistsError } from './errors/space-already-exists-error.js'
import { SpaceNotFoundError } from './errors/space-not-found-error.js'

export class UpdateSpaceName {
  async execute({ id, name }) {
    await sequelize.sync()

    const space = await Space.findOne({
      where: {
        id
      }
    })

    const isExistsSpace = await Space.findOne({
      where: {
        name
      }
    })

    if (!space) {
      throw new SpaceNotFoundError()
    }

    if (space.id !== isExistsSpace.id) {
      throw new SpaceAlreadyExistsError()
    }

    space.name = name;
    await space.save()

    return space
  }
}