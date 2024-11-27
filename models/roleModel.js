// models/roleModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Role = sequelize.define('Role', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 1  // 1 para activo, 0 para inactivo
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;
