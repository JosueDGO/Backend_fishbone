const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');  // Importa cors


// Importar las rutas
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permisoRoutes = require('./routes/permisoRoutes');  // Notar que se usa "permiso"
const rolePermisoRoutes = require('./routes/rolePermissionRoutes');  // Notar que se usa "permiso"
const paisRoutes = require('./routes/paisRoutes');
const regionRoutes = require('./routes/regionRoutes');
const bitacoraRoutes = require('./routes/bitacoraRoutes');
const errorLogRoutes = require('./routes/errorLogRoutes');
const etniaRoutes = require('./routes/etniaRoutes');  // Importar las rutas de etnias

// Configurar dotenv
dotenv.config();
app.use(cors());  // Permite todas las solicitudes desde cualquier origen

// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permisos', permisoRoutes);  // Rutas de permisos
app.use('/api/roles_permisos', rolePermisoRoutes);  // Rutas de roles-permisos
app.use('/api/paises', paisRoutes);
app.use('/api/regiones', regionRoutes);
app.use('/api/bitacora', bitacoraRoutes);
app.use('/api/error-log', errorLogRoutes);
app.use('/api/etnias', etniaRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
