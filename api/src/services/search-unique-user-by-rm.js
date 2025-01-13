import { sequelize, User } from "../lib/sequelize.js";

export class SearchUniqueUserByRM {
  async execute({ rm }) {
    await sequelize.sync()
    const user = await User.findOne({
      where: {
        rm
      }
    })

    return { user }
  }
}
