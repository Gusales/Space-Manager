import { hash } from "bcrypt";
import { sequelize, users } from "../lib/sequelize.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";

export class Register{
  async execute({ name, email, password, rm,  telephone, active, actype }){
    await sequelize.sync()

    let user = await users.findOne({
      where: {
        rm
      }
    })

    if (user) { 
      throw new UserAlreadyExistsError()
    }


    user = await users.create({
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