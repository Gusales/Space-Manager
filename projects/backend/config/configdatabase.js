const Sequelize = require("sequelize");
const sequelize = new Sequelize("smdb", "root", "", {
  dialect: "mysql", //Tipo do banco de dados
  host: "localhost", //onde está hospedado o banco de dados
  port: 3306, //porta padrão, mas nunca se sabe se onde vamos hospedar o banco a porta vai ser diferente
});
//new Sequelize('Banco de dados', 'usuário', 'senha', 'parâmetros - opções')

module.exports = sequelize;
