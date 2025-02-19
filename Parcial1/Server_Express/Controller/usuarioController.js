const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'neymar2003',
    database: 'asesoratec'
});

function consultarUsuario(req, res, next) {
    let consulta = '';

    if (typeof(req.query.id) === 'undefined') {
        consulta = `SELECT\ * FROM usuarios`;
    } else {
        consulta = 'SELECT * FROM usuarios WHERE idUsuario='+req.query.idUsuario;
    }

    connection.query(consulta,
        function (err, results, fields) {

            if (err) {
                res.json({ Error: 'Error en Servidor' });
                res.json({ resultado:results });

            } else {
                res.json({ resultado: 'No se encontraron resultados' });
            }
        }
    );
}