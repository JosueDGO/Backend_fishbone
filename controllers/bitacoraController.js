const Bitacora = require('../models/bitacoraModel');

// Crear una nueva entrada en la bitácora
exports.createBitacora = async (req, res) => {
    try {
        const { id_usuario, accion, ip_usuario, detalle } = req.body;
        const bitacora = await Bitacora.create({ id_usuario, accion, ip_usuario, detalle });
        res.status(201).json(bitacora);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la entrada en la bitácora', error: error.message });
    }
};

// Obtener todas las entradas de la bitácora
exports.getAllBitacoras = async (req, res) => {
    try {
        const bitacoras = await Bitacora.findAll();
        res.status(200).json(bitacoras);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las entradas de la bitácora', error: error.message });
    }
};

// Obtener una entrada de la bitácora por ID
exports.getBitacoraById = async (req, res) => {
    try {
        const { id_bitacora } = req.params;
        const bitacora = await Bitacora.findByPk(id_bitacora);
        if (!bitacora) {
            return res.status(404).json({ message: 'Entrada de bitácora no encontrada' });
        }
        res.status(200).json(bitacora);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la entrada de la bitácora', error: error.message });
    }
};
