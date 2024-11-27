// controllers/etniaController.js
const Etnia = require('../models/etniaModel');

// Crear una nueva etnia
exports.createEtnia = async (req, res) => {
    try {
        const { nombre, activo } = req.body;

        // Validar que el nombre esté presente
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre de la etnia es requerido' });
        }

        // Crear la nueva etnia
        const etnia = await Etnia.create({
            nombre,
            activo
        });

        res.status(201).json(etnia);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la etnia', error: error.message });
    }
};

// Obtener todas las etnias
exports.getAllEtnias = async (req, res) => {
    try {
        const etnias = await Etnia.findAll({
            where: {
                activo: 1  // Solo etnias activas
            }
        });

        if (etnias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron etnias activas' });
        }

        res.status(200).json(etnias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener etnias', error: error.message });
    }
};

// Obtener una etnia por ID
exports.getEtniaById = async (req, res) => {
    try {
        const { id_etnia } = req.params;

        const etnia = await Etnia.findOne({
            where: {
                id_etnia,
                activo: 1  // Solo etnias activas
            }
        });

        if (!etnia) {
            return res.status(404).json({ message: 'Etnia no encontrada o inactiva' });
        }

        res.status(200).json(etnia);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la etnia', error: error.message });
    }
};

// Modificar una etnia
exports.updateEtnia = async (req, res) => {
    try {
        const { id_etnia } = req.params;
        const { nombre, activo } = req.body;

        const etnia = await Etnia.findByPk(id_etnia);

        if (!etnia) {
            return res.status(404).json({ message: 'Etnia no encontrada' });
        }

        // Actualizar la etnia
        await etnia.update({
            nombre,
            activo
        });

        res.status(200).json(etnia);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la etnia', error: error.message });
    }
};

// Eliminar una etnia (cambiar su estado a inactivo)
exports.deleteEtnia = async (req, res) => {
    try {
        const { id_etnia } = req.params;

        const etnia = await Etnia.findByPk(id_etnia);

        if (!etnia) {
            return res.status(404).json({ message: 'Etnia no encontrada' });
        }

        // Cambiar el estado a inactivo (activo: 0)
        await etnia.update({ activo: 0 });

        res.status(200).json({ message: 'Etnia desactivada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al desactivar la etnia', error: error.message });
    }
};
