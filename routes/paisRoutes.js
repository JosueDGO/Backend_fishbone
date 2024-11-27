const express = require('express');
const router = express.Router();
const paisController = require('../controllers/paisController');

router.post('/create', paisController.createPais);
router.get('/', paisController.getAllPaises);
router.get('/:id_pais', paisController.getPaisById);
router.put('/update/:id_pais', paisController.updatePais);
router.delete('/delete/:id_pais', paisController.deletePais);

module.exports = router;
