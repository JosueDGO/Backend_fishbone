const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Pais = require('./paisModel');  // Para la relación con Paises

const Region = sequelize.define('Region', {
    id_region: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    id_pais: {
        type: DataTypes.INTEGER,
        references: {
            model: Pais,
            key: 'id_pais'
        }
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'regiones',
    timestamps: false
});

// Definir la relación
Pais.hasMany(Region, { foreignKey: 'id_pais' });
Region.belongsTo(Pais, { foreignKey: 'id_pais' });

module.exports = Region;
