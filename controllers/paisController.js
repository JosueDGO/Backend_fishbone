const Pais = require('../models/paisModel');

// Crear un nuevo país
exports.createPais = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre es obligatorio' });
        }

        const pais = await Pais.create({ nombre });
        res.status(201).json(pais);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el país', error: error.message });
    }
};

// Obtener todos los países activos
exports.getAllPaises = async (req, res) => {
    try {
        const paises = await Pais.findAll({ where: { activo: 1 } });
        res.status(200).json(paises);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los países', error: error.message });
    }
};

// Obtener un país por ID
exports.getPaisById = async (req, res) => {
    try {
        const { id_pais } = req.params;
        const pais = await Pais.findOne({ where: { id_pais, activo: 1 } });
        if (!pais) {
            return res.status(404).json({ message: 'País no encontrado o inactivo' });
        }
        res.status(200).json(pais);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el país', error: error.message });
    }
};

// Actualizar un país
exports.updatePais = async (req, res) => {
    try {
        const { id_pais } = req.params;
        const { nombre } = req.body;
        const pais = await Pais.findByPk(id_pais);

        if (!pais) {
            return res.status(404).json({ message: 'País no encontrado' });
        }

        await pais.update({ nombre });
        res.status(200).json(pais);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el país', error: error.message });
    }
};

// Eliminar un país (cambiar activo a 0)
exports.deletePais = async (req, res) => {
    try {
        const { id_pais } = req.params;
        const pais = await Pais.findByPk(id_pais);

        if (!pais) {
            return res.status(404).json({ message: 'País no encontrado' });
        }

        await pais.update({ activo: 0 });
        res.status(200).json({ message: 'País desactivado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al desactivar el país', error: error.message });
    }
};
