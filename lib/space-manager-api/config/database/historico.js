const database = require("../configdatabase");
const Sequelize = require("sequelize");

const res = database.define("historico", {
  id: {
    type: Sequelize.INTEGER(5),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hora: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sala: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  materia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  solicitante_da_reserva: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horario_da_solicitação: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  registro_de_modificação: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rm: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = res;
