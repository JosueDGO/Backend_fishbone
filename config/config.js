// config/config.js
const { Sequelize } = require('sequelize');

// Lee las variables de entorno del archivo .env
require('dotenv').config();

// Configuración de la base de datos usando Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nombre de la base de datos
    process.env.DB_USER,      // Usuario de la base de datos
    process.env.DB_PASSWORD,  // Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Dirección del servidor MySQL
        dialect: 'mysql',          // Tipo de base de datos (mysql, postgres, etc.)
        logging: false,            // Desactivar el log de SQL en consola
    }
);

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa!');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

module.exports = sequelize;
