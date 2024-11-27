const Region = require('../models/regionModel');
const Pais = require('../models/paisModel');  // Asegúrate de que la ruta sea correcta

// Crear una nueva región
exports.createRegion = async (req, res) => {
    try {
        const { nombre, id_pais } = req.body;
        if (!nombre || !id_pais) {
            return res.status(400).json({ message: 'Nombre e id_pais son obligatorios' });
        }

        const region = await Region.create({ nombre, id_pais });
        res.status(201).json(region);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la región', error: error.message });
    }
};

// Obtener todas las regiones activas
exports.getAllRegiones = async (req, res) => {
    try {
        const regiones = await Region.findAll({ where: { activo: 1 } });
        res.status(200).json(regiones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las regiones', error: error.message });
    }
};

// Obtener una región por ID
exports.getRegionById = async (req, res) => {
    try {
        const { id_region } = req.params;
        const region = await Region.findOne({ where: { id_region, activo: 1 } });
        if (!region) {
            return res.status(404).json({ message: 'Región no encontrada o inactiva' });
        }
        res.status(200).json(region);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la región', error: error.message });
    }
};

// Actualizar una región
exports.updateRegion = async (req, res) => {
    try {
        const { id_region } = req.params;
        const { nombre, id_pais } = req.body;
        const region = await Region.findByPk(id_region);

        if (!region) {
            return res.status(404).json({ message: 'Región no encontrada' });
        }

        await region.update({ nombre, id_pais });
        res.status(200).json(region);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la región', error: error.message });
    }
};

// Eliminar una región (cambiar activo a 0)
exports.deleteRegion = async (req, res) => {
    try {
        const { id_region } = req.params;
        const region = await Region.findByPk(id_region);

        if (!region) {
            return res.status(404).json({ message: 'Región no encontrada' });
        }

        await region.update({ activo: 0 });
        res.status(200).json({ message: 'Región desactivada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al desactivar la región', error: error.message });
    }
};

exports.getRegionesByPais = async (req, res) => {
    try {
        const { id_pais } = req.params;

        // Buscar regiones que correspondan al id_pais
        const regiones = await Region.findAll({ 
            where: { id_pais },
            include: {
                model: Pais,   // Incluimos el modelo Pais si necesitas mostrar detalles del país también
                attributes: ['nombre']  // Puedes personalizar los atributos que deseas mostrar del pais
            }
        });

        if (regiones.length === 0) {
            return res.status(404).json({ message: 'No se encontraron regiones para este país' });
        }

        res.status(200).json(regiones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las regiones', error: error.message });
    }
};
