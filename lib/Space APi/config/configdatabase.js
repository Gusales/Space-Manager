const Sequelize = require("sequelize");
const sequelize = new Sequelize("sql10519977", "sql10519977", "m8bjadbEZj", {
  dialect: "mysql", //Tipo do banco de dados
  host: "sql10.freesqldatabase.com", //onde está hospedado o banco de dados
  port: 3306, //porta padrão, mas nunca se sabe se onde vamos hospedar o banco a porta vai ser diferente
});
//new Sequelize('Banco de dados', 'usuário', 'senha', 'parâmetros - opções')

module.exports = sequelize;
