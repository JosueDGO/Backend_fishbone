const User = require('../models/userModel');
const Bitacora = require('../models/bitacoraModel'); // Importar el modelo de la Bitacora
const Etnia = require('../models/etniaModel'); // Importar el modelo de Etnia


const bcrypt = require('bcryptjs'); // Importar bcryptjs
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken
const { Op } = require('sequelize'); // Operadores de Sequelize
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service: 'gmail',  // Puedes usar otro servicio si lo prefieres
    auth: {
        user: "joshinzengumi007@gmail.com",  // Tu correo electrónico
        pass: "zuol clzk txgi ykbi"   // Tu contraseña de aplicación de Google
    }
});
// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { dpi, nit, telefono, direccion, correo, nombres, apellidos, rol, pais, region, passuser, genero, edad, pesoKg, estaturacm, etnia } = req.body;

        // Validar que los campos necesarios estén presentes
        if (!dpi || !correo || !nombres || !apellidos || !passuser || !edad || !pesoKg || !estaturacm) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(passuser, 10); // Encriptar la contraseña con bcrypt

        // Crear el usuario en la base de datos con la contraseña encriptada
        const user = await User.create({
            dpi,
            nit,
            telefono,
            direccion,
            correo,
            nombres,
            apellidos,
            rol,
            pais,
            region,
            passuser: hashedPassword,  // Guardar la contraseña encriptada
            genero,
            edad,
            pesoKg,
            estaturacm,
            etnia
        });

        // Eliminar la contraseña de la respuesta
        const userData = { ...user.toJSON() };
        delete userData.passuser;  // Eliminamos la contraseña antes de enviarla al cliente

        res.status(201).json(userData);  // Retornamos el usuario sin la contraseña
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

// Modificar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { dpi, nit, telefono, direccion, correo, nombres, apellidos, rol, pais, region, passuser, genero, edad, pesoKg, estaturacm, etnia } = req.body;

        const user = await User.findByPk(id_usuario);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si la contraseña es proporcionada, la encriptamos
        let hashedPassword = passuser;
        if (passuser) {
            hashedPassword = await bcrypt.hash(passuser, 10); // Encriptamos la nueva contraseña
        }

        // Actualizar los campos del usuario
        await user.update({
            dpi,
            nit,
            telefono,
            direccion,
            correo,
            nombres,
            apellidos,
            rol,
            pais,
            region,
            passuser: hashedPassword,  // Guardamos la contraseña encriptada si se ha actualizado
            genero,
            edad,
            pesoKg,
            estaturacm,
            etnia
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
};

// Eliminar un usuario (cambiar su estado a "inactivo")
exports.deleteUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const user = await User.findByPk(id_usuario);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Cambiar el estado a "inactivo"
        await user.update({ activo: 0 });

        res.status(200).json({ message: 'Usuario desactivado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al desactivar el usuario', error: error.message });
    }
};

// Buscar un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const user = await User.findOne({
            where: {
                id_usuario,     // Buscar por ID
                activo: 1        // Solo usuarios activos
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
};

// Buscar todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                activo: 1  // Solo usuarios activos
            }
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

// Buscar un usuario por DPI
exports.getUserByDpi = async (req, res) => {
    try {
        const { dpi } = req.params;

        const user = await User.findOne({
            where: {
                dpi,
                activo: 1  // Asegura que el usuario esté activo
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el usuario', error: error.message });
    }
};

// Buscar usuarios por nombre
exports.getUsersByName = async (req, res) => {
    try {
        const { nombre } = req.params;

        const users = await User.findAll({
            where: {
                nombres: {
                    [Op.like]: `%${nombre}%`  // Buscar coincidencias parciales con el nombre
                },
                activo: 1  // Solo buscar usuarios activos
            }
        });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar usuarios', error: error.message });
    }
};

// Autenticación de usuario (verificación de la contraseña)
exports.authenticateUser = async (req, res) => {
    try {
      const { correo, passuser } = req.body;
  
      // Verifica que los datos necesarios se hayan enviado
      if (!correo || !passuser) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
      }
  
      // Buscar el usuario por correo aqui cambio
      const user = await User.findOne({
        where: { correo, activo: 1 },
        include: [
            {
                model: Etnia,
                as: 'etniaData',
                attributes: ['nombre']  // Solo traer el nombre de la etnia
            }
        ]
    });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
      }
  
      // Verificar la contraseña usando bcrypt
      const isMatch = await bcrypt.compare(passuser, user.passuser);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      // Actualizar el campo fechaUltimoLogin con la fecha y hora actuales
      await User.update(
        { fechaUltimoLogin: new Date() }, // Fecha y hora actuales
        { where: { id_usuario: user.id_usuario } }
      );
  
      // Generar un token JWT
      const token = jwt.sign({ id_usuario: user.id_usuario }, 'tu_clave_secreta', { expiresIn: '1h' });
  
      // Obtener la IP del usuario
      const ipUsuario = req.ip; // Obtiene la IP de la solicitud
  
      // Registrar en la bitácora
      await Bitacora.create({
        id_usuario: user.id_usuario,
        accion: 'LOGIN',
        ip_usuario: ipUsuario,
        detalle: 'Inicio de sesión exitoso'
      });
  
      // Devolver el usuario y el token
      res.status(200).json({
        message: 'Autenticación exitosa',
        user: {
          id_usuario: user.id_usuario,
          correo: user.correo,
          nombres: user.nombres,
          apellidos: user.apellidos,
          edad: user.edad,
          pesoKg: user.pesoKg,
          estaturacm: user.estaturacm,
          etnia: user.etniaData ? user.etniaData.nombre : null , // Devolver el nombre de la etnia
          genero: user.genero
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error en la autenticación', error: error.message });
    }
  };


// Endpoint para "Olvidé la contraseña"
exports.forgotPassword = async (req, res) => {
    try {
        const { correo } = req.body;

        if (!correo) {
            return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
        }

        // Verificar si el usuario existe
        const user = await User.findOne({ where: { correo, activo: 1 } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
        }

        // Generar un token para la recuperación de la contraseña
        const resetToken = jwt.sign({ id_usuario: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Crear un enlace de restablecimiento
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        // Enviar un correo electrónico con el enlace de restablecimiento
        const mailOptions = {
            from: process.env.EMAIL_USER,  // Remitente
            to: user.correo,  // Destinatario
            subject: 'Recuperación de contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo de recuperación enviado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al enviar el correo de recuperación', error: error.message });
    }
};

// Endpoint para restablecer la contraseña
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: 'El token y la nueva contraseña son requeridos' });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id_usuario);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la base de datos
        await user.update({ passuser: hashedPassword });

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al restablecer la contraseña', error: error.message });
    }
};