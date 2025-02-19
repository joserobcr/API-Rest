const express = require('express');
const cors = require('cors'); 
const { text } = require('body-parser');
const multer = require('multer');
const app = express();
const path = require('path');
const PORT = 3001;
const xmlparser = require('express-xml-bodyparser');
const routerUsuario = require('./Router/usuarioRouter.js');

//middleware para parsear el body de las peticiones
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

app.use('/usuarios', routerUsuario.router);


app.use((req, res) => {
    res.status(404);
    res.send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});



/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'neymar2003',
    database: 'asesoratec',
  });*/

  /*app.get('/usuarios', (req, res, next) => {
    
    let consulta = '';

    if (typeof req.query.id !== 'undefined') {
        consulta = `SELECT * FROM usuarios WHERE id = ${req.query.id}`;
    } else {
        consulta = `SELECT * FROM usuarios`;
    }
    
    console.log(consulta);

    connection.query(consulta,
        function (err, results, fields) {
            console.log(results);

            if(results.length > 0){
                res.json({resultado:results});

            }else{
                res.json({resultado: 'No se encontraron resultados'});
            }
        }
      );
  });*/

/*app.use(cors()); // Habilita CORS para todas las rutas



//middleware incorporado en express
app.use('/', (req, res, next) => {
console.log("Peticion al server")
next();   
},
(req, res, next) => {
    console.log("2da funcion middleware");
    next();
});

const folder = path.join(__dirname + '/ArchivosRecibidos/');
const upload = multer({ dest: folder });
app.use(upload.single('archivo'));

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

//EJEMPLO THUNDER CLIENT POST CON MULTER
app.post('/prefectos', (req, res) => {
    console.log(`Se recibio el archivo : ${req.file.originalname}`);
    console.log(req.body);
    console.log('Se recibio el formulario :' +JSON.stringify(req.body));
    res.json(req.body);
});

//ejemplo thunder client patch
app.patch('/maestros', (req, res) => {
    console.log(req.body);
    res.send('Hello Worlddddd');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hola');
});*/


