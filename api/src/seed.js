import 'dotenv/config'
import mysql from 'mysql2/promise.js'
import { hash } from 'bcrypt'
import { sequelize, User, Booking, Space } from './lib/sequelize.js'
import { generateCUID } from './utils/generate-cuid.js'

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

const spaces = [
  { name: 'Quadra' },
  { name: 'Laboratório de Informática 1' },
  { name: 'Laboratório de Informática 2' },
  { name: 'Laboratório de Informática 3' },
  { name: 'Laboratório de Informática 4' },
  { name: 'Laboratório de Química' },
  { name: 'Auditório' },
]

async function seed(){
  try {
    console.log('Executing database conection')
    const mysql_connection = await mysql.createConnection({
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    })
    console.log('Database connected successfully')
    console.log(`Create database ${process.env.DATABASE}`)
    await mysql_connection.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE}`)
    await mysql_connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`)
    console.log(`Database ${process.env.DATABASE} created!`)
    
    await sequelize.sync()

    console.log('Creating users')
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
          actype: user.actype,
          firstLoggin: user.rm === 99999 ? false : true,
        })
      }
    })

    console.log('Users created successfully')
    console.log('Inserting spaces')
    for (let index = 0; index < spaces.length; index++) {
      await Space.create({
        name: spaces[index].name
      });
    }

    console.log('Spaces have been inserted successfully')

    const findUser = await User.findOne({
      where: {
        rm: users[0].rm
      }
    })

    const findOneSpace = await Space.findOne({
      where: {
        name: spaces[0].name
      }
    })

    console.log(`Create a booking to ${findUser.name} in space ${findOneSpace.name}`)

    await Booking.create({
      starts_at: '2023-12-06T10:30:00.958Z',
      ends_at: '2023-12-06T11:20:00.958Z',
      description: 'Reserva de teste',
      user_id: findUser.id,
      space_id: findOneSpace.id,
      code: generateCUID()
    })
    console.log('Booking has created sucessfully')
    
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