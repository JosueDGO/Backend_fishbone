const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');

router.post('/create', regionController.createRegion);
router.get('/', regionController.getAllRegiones);
router.get('/:id_region', regionController.getRegionById);
router.put('/update/:id_region', regionController.updateRegion);
router.delete('/delete/:id_region', regionController.deleteRegion);
router.get('/pais/:id_pais', regionController.getRegionesByPais);
module.exports = router;
