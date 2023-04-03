const database = require("../configdatabase");
const Sequelize = require("sequelize");

const Space = database.define("smespa", {
  idEspa: {
    type: Sequelize.INTEGER(4),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  espEspa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Space;
