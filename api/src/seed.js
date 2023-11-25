import 'dotenv/config'
import mysql from 'mysql2/promise.js'
import { hash } from 'bcrypt'
import { sequelize, User } from './lib/sequelize.js'

const users = [{
  name: 'root',
  email: 'gussales14@gmail.com',
  password: '123456',
  rm: 99999,
  telephone: '(11) 99999-9999',
  actype: 'ADMIN',
},
{
  name: 'professor 1',
  email: 'gersons.br13@gmail.com',
  password: '123456',
  rm: 99998,
  actype: 'PROF',
},
{
  name: 'coordenador 1',
  email: 'dev.gussales@gmail.com',
  password: '123456',
  rm: 99997,
  actype: 'COORD',
}]

async function seed(){
  try {
    const mysql_connection = await mysql.createConnection({
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    })

    await mysql_connection.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE}`)
    await mysql_connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`)
    
    await sequelize.sync()

    users.forEach(async (user) => {
      let userToCreate = await User.findOne({
        where: {
          rm: user.rm
        }
      })
      
      if (!userToCreate) {
        await User.create({
          name: user.name,
          email: user.email,
          rm: user.rm,
          password: await hash(user.password, 6),
          telephone: user.telephone ?? null,
          actype: user.actype
        })
      }
    })
    
    await mysql_connection.end()
  } catch (error) {
    throw error
  }
}

seed().then(() => {
  console.log('🎉🎉 SUCESSO! Seu banco de dados foi criado com sucesso, agora você está livre para usar 😁😎')
  console.log('Lembre-se das credenciais para login viu? 😉')
  console.table(users)
})
