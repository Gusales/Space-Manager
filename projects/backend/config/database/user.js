const database = require("../configdatabase");
const Sequelize = require("sequelize");

const profile = database.define("smcad", {
  idCad: {
    type: Sequelize.INTEGER(4),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  namecCad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  emailCad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  seCad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rmCad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  teleCad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stateCad: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  typeCad: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = profile;
