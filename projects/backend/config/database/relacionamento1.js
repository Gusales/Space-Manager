const database = require("../configdatabase");
const Sequelize = require("sequelize");

const relacionamento = database.define("smRelacionamentoUserMat", {
    idRel: {
    type: Sequelize.INTEGER(4),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    },
    idMat: {
    type: Sequelize.STRING,
    allowNull: false,
    },
    idUser: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = relacionamento;