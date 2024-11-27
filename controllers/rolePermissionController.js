// controllers/rolePermissionController.js
const RolePermission = require('../models/rolePermissionModel');

// Crear relación rol-permiso
exports.createRolePermission = async (req, res) => {
    try {
        const { id_rol, id_permiso } = req.body;

        if (!id_rol || !id_permiso) {
            return res.status(400).json({ message: 'ID de rol y permiso son obligatorios' });
        }

        const rolePermission = await RolePermission.create({ id_rol, id_permiso });
        res.status(201).json(rolePermission);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la relación rol-permiso', error: error.message });
    }
};

// Consultar todas las relaciones activas rol-permiso
exports.getAllRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await RolePermission.findAll({ where: { activo: 1 } });
        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las relaciones rol-permiso', error: error.message });
    }
};

// Consultar relación rol-permiso por ID
exports.getRolePermissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const rolePermission = await RolePermission.findOne({ where: { id, activo: 1 } });

        if (!rolePermission) {
            return res.status(404).json({ message: 'Relación rol-permiso no encontrada o inactiva' });
        }

        res.status(200).json(rolePermission);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la relación rol-permiso', error: error.message });
    }
};

// Modificar relación rol-permiso
exports.updateRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_rol, id_permiso } = req.body;

        const rolePermission = await RolePermission.findByPk(id);

        if (!rolePermission) {
            return res.status(404).json({ message: 'Relación rol-permiso no encontrada' });
        }

        await rolePermission.update({ id_rol, id_permiso });
        res.status(200).json(rolePermission);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la relación rol-permiso', error: error.message });
    }
};

// Desactivar relación rol-permiso
exports.deleteRolePermission = async (req, res) => {
    try {
        const { id } = req.params;

        const rolePermission = await RolePermission.findByPk(id);

        if (!rolePermission) {
            return res.status(404).json({ message: 'Relación rol-permiso no encontrada' });
        }

        await rolePermission.update({ activo: 0 });
        res.status(200).json({ message: 'Relación rol-permiso desactivada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al desactivar la relación rol-permiso', error: error.message });
    }
};
