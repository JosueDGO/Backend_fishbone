// routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permisoController');

// Rutas de permisos
router.post('/create', permissionController.createPermission);
router.get('/', permissionController.getAllPermissions);
router.get('/:id_permiso', permissionController.getPermissionById);
router.get('/description/:descripcion', permissionController.getPermissionByDescription);
router.put('/update/:id_permiso', permissionController.updatePermission);
router.delete('/delete/:id_permiso', permissionController.deletePermission);

module.exports = router;
