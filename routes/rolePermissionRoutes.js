// routes/rolePermissionRoutes.js
const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');

// Rutas de roles-permisos
router.post('/create', rolePermissionController.createRolePermission);
router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.put('/update/:id', rolePermissionController.updateRolePermission);
router.delete('/delete/:id', rolePermissionController.deleteRolePermission);

module.exports = router;
