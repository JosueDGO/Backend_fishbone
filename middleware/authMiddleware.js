const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Obtener el token desde los headers de la solicitud
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // 'Bearer <token>'

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // Verificar el token JWT
    jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        // Si el token es válido, agregamos el ID del usuario a la solicitud
        req.userId = decoded.id_usuario;
        next(); // Llamamos a la siguiente función del middleware o ruta
    });
};

module.exports = verifyToken;
