import { sequelize, Space } from "../lib/sequelize.js";

export class FetchSpaces {
  async execute(){
    await sequelize.sync()

    const spaces = await Space.findAll()

    return { spaces }
  }
}