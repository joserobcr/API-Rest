const express = require('express');
const cors = require('cors'); 
const { text } = require('body-parser');
const app = express();
const PORT = 3001;

app.use(cors()); // Habilita CORS para todas las rutas

app.use('/', (req, res, next) => {
console.log("Peticion al server")
next();   
},
(req, res, next) => {
    console.log("2da funcion middleware");
    next();
});

//middleware incorporado en express
//middleware para parsear el body de las peticiones
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World');
});

app.use((req, res) => {
    res.status(404);
    res.send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
