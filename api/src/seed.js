import 'dotenv/config'
import { hash } from 'bcrypt'
import { sequelize, User } from './lib/sequelize.js'

const userAdmin = {
  name: 'Root',
  email: 'root@email.com',
  password: await hash('123456', 6),
  rm: 99999,
  actype: 'ADMIN',
}

async function loadUsers() {
  await sequelize.sync()

  try {
    const user = await User.create(userAdmin)

    console.log('Sucesso! usuário Administrador criado')
    console.log(user)
  } catch (error) {
    throw new Error(error)
  }
}

loadUsers()
