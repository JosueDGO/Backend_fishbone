// models/permissionModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Permission = sequelize.define('Permission', {
    id_permiso: {
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
        defaultValue: 1
    }
}, {
    tableName: 'permisos',
    timestamps: false
});

module.exports = Permission;
