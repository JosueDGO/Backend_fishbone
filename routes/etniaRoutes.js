// routes/etniaRoutes.js
const express = require('express');
const router = express.Router();
const etniaController = require('../controllers/etniaController');

// Rutas de etnias
router.post('/create', etniaController.createEtnia);
router.get('/', etniaController.getAllEtnias);
router.get('/:id_etnia', etniaController.getEtniaById);
router.put('/update/:id_etnia', etniaController.updateEtnia);
router.delete('/delete/:id_etnia', etniaController.deleteEtnia);

module.exports = router;
