import { sequelize, Space } from "../lib/sequelize.js";
import { SpaceAlreadyExistsError } from "./errors/space-already-exists-error.js";

export class CreateNewSpace {
  async execute({ name }){
      await sequelize.sync()

      let spaces = await Space.findOne({
        where: {
          name
        }
      })

      if (spaces) {
        throw new SpaceAlreadyExistsError()
      }

      spaces = await Space.create({
        name
      })

      return { spaces }
  }
}