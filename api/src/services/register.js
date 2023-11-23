import { hash } from "bcrypt";
import { sequelize, User } from "../lib/sequelize.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";
import { SearchUniqueUserByRM } from "./search-unique-user-by-rm.js";

export class Register{
  async execute({ name, email, password, rm,  telephone, active, actype }){
    await sequelize.sync()

    const searchUniqueUserByRM = new SearchUniqueUserByRM()
    let user = await searchUniqueUserByRM.execute({ rm })

    if (user.user) {
      throw new UserAlreadyExistsError()
    }


    user = await User.create({
      rm,
      name,
      email,
      password: await hash(password, 6),
      telephone,
      active,
      actype
    })
    return { user }
  }
}
