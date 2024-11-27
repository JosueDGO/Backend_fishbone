// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Rutas de usuarios
router.post('/create', userController.createUser);
router.put('/update/:id_usuario', userController.updateUser);
router.delete('/delete/:id_usuario', userController.deleteUser);
router.get('/:id_usuario', userController.getUserById);
router.get('/', userController.getAllUsers);
router.get('/dpi/:dpi', userController.getUserByDpi);
router.get('/name/:nombre', userController.getUsersByName);

// Ruta para autenticación de usuarios
/* router.post('/authenticate', userController.authenticateUser);  */
router.post('/authenticate', userController.authenticateUser);
// Ruta para enviar el correo de recuperación de contraseña
router.post('/forgot-password', userController.forgotPassword);
// Ruta para restablecer la contraseña
router.post('/reset-password', userController.resetPassword);


module.exports = router;
