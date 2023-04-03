const database = require("../configdatabase");
const Sequelize = require("sequelize");

const relacionamento = database.define("smRelacionamentoReserva", {
    idRel: {
    type: Sequelize.INTEGER(4),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    },
    idHora: {
    type: Sequelize.STRING,
    allowNull: false,
    },
    idRes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    espRes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dayRes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idUser: {
        type: Sequelize.INTEGER(4),
        allowNull: false
    },
})

module.exports = relacionamento;

