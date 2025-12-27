const database = require("../configdatabase");
const Sequelize = require("sequelize");

const mat = database.define("smmat", {
  idMat: {
    type: Sequelize.INTEGER(4),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  matsMat: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = mat;
