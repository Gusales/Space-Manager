import { sequelize, User } from "../lib/sequelize.js";

export class SearchUniqueUserById {
  async execute({ id }) {
    await sequelize.sync()
    const user = await User.findOne({
      where: {
        id
      }
    })

    return { user }
  }
}
