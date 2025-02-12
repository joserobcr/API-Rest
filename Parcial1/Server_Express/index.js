const express = require('express');
const cors = require('cors'); 
const { text } = require('body-parser');
const app = express();
const PORT = 3001;
const xmlparser = require('express-xml-bodyparser');

app.use(cors()); // Habilita CORS para todas las rutas

//middleware incorporado en express
app.use('/', (req, res, next) => {
console.log("Peticion al server")
next();   
},
(req, res, next) => {
    console.log("2da funcion middleware");
    next();
});

//middleware para parsear el body de las peticiones
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

//ejemplo thunder client get
app.get('/alumno', (req, res) => {
    console.log(req.query);
    res.sendFile(__dirname + '/public/index.html');;
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//ejercicio thunder client post
app.post('/sistemas/:control', (req, res) => {
    console.log(req.params);
    res.send('Hola mundo');
});

//ejercicio thunder client post XML
app.post('/prefectos', (req, res) => {
    console.log(req.body);
    res.send('Hola mundo');
});

//ejemplo thunder client patch
app.patch('/maestros', (req, res) => {
    console.log(req.body);
    res.send('Hello Worlddddd');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hola');
});

app.use((req, res) => {
    res.status(404);
    res.send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
