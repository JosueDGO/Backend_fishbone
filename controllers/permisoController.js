// controllers/permissionController.js
const Permission = require('../models/permisoModel');
const { Op } = require('sequelize');  // Operadores de Sequelize

// Crear permiso
exports.createPermission = async (req, res) => {
    try {
        const { descripcion } = req.body;

        if (!descripcion) {
            return res.status(400).json({ message: 'La descripción es obligatoria' });
        }

        const permission = await Permission.create({ descripcion });
        res.status(201).json(permission);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el permiso', error: error.message });
    }
};

// Consultar todos los permisos activos
exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll({ where: { activo: 1 } });
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los permisos', error: error.message });
    }
};

// Consultar permiso por ID
exports.getPermissionById = async (req, res) => {
    try {
        const { id_permiso } = req.params;
        const permission = await Permission.findOne({ where: { id_permiso, activo: 1 } });

        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado o inactivo' });
        }

        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el permiso', error: error.message });
    }
};

// Consultar permiso por descripción
exports.getPermissionByDescription = async (req, res) => {
    try {
        const { descripcion } = req.params;
        const permissions = await Permission.findAll({
            where: {
                descripcion: { [Op.like]: `%${descripcion}%` },
                activo: 1
            }
        });

        if (permissions.length === 0) {
            return res.status(404).json({ message: 'No se encontraron permisos' });
        }

        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar permisos', error: error.message });
    }
};

// Modificar permiso
exports.updatePermission = async (req, res) => {
    try {
        const { id_permiso } = req.params;
        const { descripcion } = req.body;

        const permission = await Permission.findByPk(id_permiso);

        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        await permission.update({ descripcion });
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el permiso', error: error.message });
    }
};

// Desactivar permiso
exports.deletePermission = async (req, res) => {
    try {
        const { id_permiso } = req.params;

        const permission = await Permission.findByPk(id_permiso);

        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        await permission.update({ activo: 0 });
        res.status(200).json({ message: 'Permiso desactivado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al desactivar el permiso', error: error.message });
    }
};
