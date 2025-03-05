require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const hal = require('hal'); // ya lo tienes requeridado

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
            let usuarios = results.map(user => {
                // Determinar mensaje de estado del usuario
                let estadoMensaje = user.activo ? "El usuario está activo" : "El usuario está inactivo";

                return halson({
                    idUsuario: user.idUsuario,
                    nombre: user.nombre,
                    correo: user.correo,
                    rol: user.rol,
                    estado: estadoMensaje
                })
                .addLink('self', `/usuarios?idUsuario=${user.idUsuario}`)
                .addLink('editar', `/usuarios/${user.idUsuario}`)
                .addLink('eliminar', `/usuarios/${user.idUsuario}`);
            });

            res.json({ usuarios });
        } else {
            res.json({ mensaje: 'No se encontraron resultados' });
        }
    });
}



function agregarUsuario(req, res) {
    const { nombre, correo, contrasena, rol, activo } = req.body;

    if (!nombre || !correo || !contrasena || !rol || activo === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios, incluyendo el estado activo/inactivo." });
    }

    const consulta = `INSERT INTO usuarios (nombre, correo, contrasena, rol, activo) VALUES (?, ?, ?, ?, ?)`;

    connection.query(consulta, [nombre, correo, contrasena, rol, activo], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor" });
        }

        let estadoMensaje = activo ? "El usuario está activo" : "El usuario está inactivo";

        const usuario = halson({
            mensaje: "Usuario creado exitosamente",
            id_usuario: results.insertId,
            estado: estadoMensaje
        })
        .addLink('self', `/usuarios?idUsuario=${results.insertId}`)
        .addLink('editar', `/usuarios/${results.insertId}`)
        .addLink('eliminar', `/usuarios/${results.insertId}`);

        res.json(usuario);
    });
}



module.exports = { consultarUsuario, agregarUsuario };