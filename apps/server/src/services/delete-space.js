import { sequelize, Space } from '../lib/sequelize.js'
import { SpaceNotFoundError } from './errors/space-not-found-error.js'

export class DeleteSpace {
  async execute(id) {
    await sequelize.sync()

    const space = await Space.findOne({
      where: {
        id
      }
    })

    if (!space) {
      throw new SpaceNotFoundError()
    }


    await space.destroy()
  }
}