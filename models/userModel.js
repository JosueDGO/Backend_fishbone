// models/userModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');  // Asegúrate de tener la conexión a tu base de datos configurada
const Etnia = require('./etniaModel'); // Importa el modelo de Etnia


const User = sequelize.define('User', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dpi: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    nit: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    nombres: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    rol: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    fechaUltimoLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 1  // 1 para activo, 0 para inactivo
    },
    pais: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    region: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    passuser: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pesoKg: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estaturacm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    etnia: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'usuarios',
    timestamps: false  // No usamos createdAt y updatedAt
    
});

User.belongsTo(Etnia, {
    foreignKey: 'etnia',  // Llave en la tabla User que hace referencia a id_etnia en Etnia
    targetKey: 'id_etnia',  // Llave en la tabla Etnia
    as: 'etniaData' // Nombre de alias para la relación
});


module.exports = User;
