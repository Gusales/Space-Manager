import { sequelize, User } from "../lib/sequelize.js";

export class FecthAllUsers {
  async execute(){
    await sequelize.sync()

    const users = await User.findAll({
      attributes: {
          exclude: ['password']
      }
  })
    return { users }
  }
}