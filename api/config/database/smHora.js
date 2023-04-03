const database = require("../configdatabase");
const Sequelize = require("sequelize");

const hora = database.define("smhora", {
  idHora: {
    type: Sequelize.INTEGER(4),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  horsHora: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = hora;
