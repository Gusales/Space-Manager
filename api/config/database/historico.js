const database = require("../configdatabase");
const Sequelize = require("sequelize");

const res = database.define("historico", {
  idHist: {
    type: Sequelize.INTEGER(5),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  curHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  matHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horaHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dayHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  espaHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descriHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estaHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horSolicHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  regisModHist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = res;
