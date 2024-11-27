// controllers/roleController.js
const Role = require('../models/roleModel');

// Crear rol
exports.createRole = async (req, res) => {
    try {
        const { descripcion } = req.body;

        if (!descripcion) {
            return res.status(400).json({ message: 'La descripción es obligatoria' });
        }

        const role = await Role.create({ descripcion });
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el rol', error: error.message });
    }
};

// Consultar todos los roles activos
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({ where: { activo: 1 } });
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los roles', error: error.message });
    }
};

// Consultar rol por ID
exports.getRoleById = async (req, res) => {
    try {
        const { id_rol } = req.params;
        const role = await Role.findOne({ where: { id_rol, activo: 1 } });

        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado o inactivo' });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el rol', error: error.message });
    }
};

// Consultar rol por descripción
exports.getRoleByDescription = async (req, res) => {
    try {
        const { descripcion } = req.params;
        const roles = await Role.findAll({
            where: {
                descripcion: { [Op.like]: `%${descripcion}%` },
                activo: 1
            }
        });

        if (roles.length === 0) {
            return res.status(404).json({ message: 'No se encontraron roles' });
        }

        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar roles', error: error.message });
    }
};

// Modificar rol
exports.updateRole = async (req, res) => {
    try {
        const { id_rol } = req.params;
        const { descripcion } = req.body;

        const role = await Role.findByPk(id_rol);

        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        await role.update({ descripcion });
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
    }
};

// Desactivar rol
exports.deleteRole = async (req, res) => {
    try {
        const { id_rol } = req.params;

        const role = await Role.findByPk(id_rol);

        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        await role.update({ activo: 0 });
        res.status(200).json({ message: 'Rol desactivado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al desactivar el rol', error: error.message });
    }
};
