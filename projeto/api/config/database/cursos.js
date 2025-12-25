const database = require("../configdatabase");
const Sequelize = require("sequelize");

const cursos = database.define("smcurs", {
    idCurs: {
        type: Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    curCurs: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = cursos