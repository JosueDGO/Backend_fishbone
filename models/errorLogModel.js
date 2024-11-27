const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Usuario = require('./userModel');  // Asegúrate de tener definido el modelo de Usuario

const ErrorLog = sequelize.define('ErrorLog', {
    id_error: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensaje: {
        type: DataTypes.STRING(500)
    },
    traza_error: {
        type: DataTypes.STRING(500)
    },
    nivel: {
        type: DataTypes.ENUM('info', 'warning', 'error', 'critical'),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        },
        allowNull: true
    },
    ip_usuario: {
        type: DataTypes.STRING(45)
    },
    urlendpoint: {
        type: DataTypes.STRING(255)
    },
    origen: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'error_log',
    timestamps: false
});

module.exports = ErrorLog;
