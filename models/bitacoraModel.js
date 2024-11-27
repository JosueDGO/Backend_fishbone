const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Usuario = require('./userModel');  // Asegúrate de tener definido el modelo de Usuario

const Bitacora = sequelize.define('Bitacora', {
    id_bitacora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    accion: {
        type: DataTypes.STRING(250)
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    ip_usuario: {
        type: DataTypes.STRING(50)
    },
    detalle: {
        type: DataTypes.STRING(500)
    }
}, {
    tableName: 'bitacora',
    timestamps: false
});

module.exports = Bitacora;
