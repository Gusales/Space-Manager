const Sequelize = require("sequelize");

const { DATABASE, DATABASE_USER, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT } = process.env

console.log(DATABASE)

module.exports = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: "mysql", //Tipo do banco de dados
  host: DATABASE_HOST, //onde está hospedado o banco de dados
  port: DATABASE_PORT, //porta padrão, mas nunca se sabe se onde vamos hospedar o banco a porta vai ser diferente
});
//new Sequelize('Banco de dados', 'usuário', 'senha', 'parâmetros - opções')
