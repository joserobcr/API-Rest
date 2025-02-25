require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

function consultarUsuario(req, res, next) {
    let consulta = '';
    let valores = [];

    if (!req.query.idUsuario) {
        consulta = 'SELECT * FROM usuarios';
    } else {
        consulta = 'SELECT * FROM usuarios WHERE idUsuario = ?';
        valores.push(req.query.idUsuario);
    }

    connection.query(consulta, valores, function (err, results) {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor', detalle: err.message });
        }

        if (results.length > 0) {
            res.json({ resultado: results });
        } else {
            res.json({ mensaje: 'No se encontraron resultados' });
        }
    });
}

function agregarUsuario(req, res) {
    const { nombre, correo, contrasena, rol } = req.body;

    if (!nombre || !correo || !contrasena || !rol) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const consulta = `INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)`;

    connection.query(consulta, [nombre, correo, contrasena, rol], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor" });
        }

        res.json({
            mensaje: "Usuario creado exitosamente",
            id_usuario: results.insertId
        });
    });
}

module.exports = { consultarUsuario, agregarUsuario };