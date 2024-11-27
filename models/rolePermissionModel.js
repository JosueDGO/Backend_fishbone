// models/rolePermissionModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Role = require('./roleModel');
const Permission = require('./permisoModel');

const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_rol: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id_rol'
        }
    },
    id_permiso: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id_permiso'
        }
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'roles_permiso',
    timestamps: false
});

module.exports = RolePermission;
