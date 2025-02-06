var http = require('http');

let server = http.createServer(function (req, res) {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // Respuesta para solicitudes normales
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*' 
    });
    res.end('Hello World');
});

server.listen(3000, () => {
    console.log("Servidor HTTP corriendo en puerto 3000");
});
