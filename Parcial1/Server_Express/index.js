const express = require('express');
const cors = require('cors'); // Descomenta esta línea
const app = express();
const PORT = 3001;

app.use(cors()); // Habilita CORS para todas las rutas

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
