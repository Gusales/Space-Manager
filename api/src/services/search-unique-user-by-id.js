import { sequelize, User } from "../lib/sequelize.js";

export class SearchUniqueUserById {
  async execute({ id }) {
    await sequelize.sync()
    const user = await User.findByPk(id)
    console.log(user)

    return { user }
  }
}
