const database = require("../configdatabase");
const Sequelize = require("sequelize");

const res = database.define("smres", {
  idRes: {
    type: Sequelize.INTEGER(5),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userRes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  curRes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  matRes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dayRes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horaResDe: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horaResAte: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  espaRes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descriRes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estaRes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horSolicRes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = res;
