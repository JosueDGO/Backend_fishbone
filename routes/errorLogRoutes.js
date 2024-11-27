const express = require('express');
const router = express.Router();
const errorLogController = require('../controllers/errorLogController');

router.post('/create', errorLogController.createErrorLog);
router.get('/', errorLogController.getAllErrorLogs);
router.get('/:id_error', errorLogController.getErrorLogById);

module.exports = router;
