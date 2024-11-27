const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Pais = sequelize.define('Pais', {
    id_pais: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'paises',
    timestamps: false
});

module.exports = Pais;
