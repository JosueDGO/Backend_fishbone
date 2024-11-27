// models/etniaModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');  // Cambia 'db' por 'config'

const Etnia = sequelize.define('Etnia', {
    id_etnia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 1  // 1 = activo, 0 = inactivo
    }
}, {
    tableName: 'etnias',
    timestamps: false  // No utilizar createdAt y updatedAt
});


module.exports = Etnia;
