const database = require("../configdatabase");
const Sequelize = require("sequelize");

const profile = database.define("cadastros", {
    id: {
        type: Sequelize.INTEGER(5),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    e_mail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    foto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    matéria: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rm: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = profile