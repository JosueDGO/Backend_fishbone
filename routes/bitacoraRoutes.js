const express = require('express');
const router = express.Router();
const bitacoraController = require('../controllers/bitacoraController');

router.post('/create', bitacoraController.createBitacora);
router.get('/', bitacoraController.getAllBitacoras);
router.get('/:id_bitacora', bitacoraController.getBitacoraById);

module.exports = router;
