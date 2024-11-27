const ErrorLog = require('../models/errorLogModel');

// Crear una nueva entrada en el log de errores
exports.createErrorLog = async (req, res) => {
    try {
        const { mensaje, traza_error, nivel, id_usuario, ip_usuario, urlendpoint, origen } = req.body;
        const errorLog = await ErrorLog.create({ mensaje, traza_error, nivel, id_usuario, ip_usuario, urlendpoint, origen });
        res.status(201).json(errorLog);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la entrada en el log de errores', error: error.message });
    }
};

// Obtener todas las entradas del log de errores
exports.getAllErrorLogs = async (req, res) => {
    try {
        const errorLogs = await ErrorLog.findAll();
        res.status(200).json(errorLogs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las entradas del log de errores', error: error.message });
    }
};

// Obtener una entrada del log de errores por ID
exports.getErrorLogById = async (req, res) => {
    try {
        const { id_error } = req.params;
        const errorLog = await ErrorLog.findByPk(id_error);
        if (!errorLog) {
            return res.status(404).json({ message: 'Entrada de log de error no encontrada' });
        }
        res.status(200).json(errorLog);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la entrada del log de errores', error: error.message });
    }
};
