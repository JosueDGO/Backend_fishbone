// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Rutas de roles
router.post('/create', roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:id_rol', roleController.getRoleById);
router.get('/description/:descripcion', roleController.getRoleByDescription);
router.put('/update/:id_rol', roleController.updateRole);
router.delete('/delete/:id_rol', roleController.deleteRole);

module.exports = router;
