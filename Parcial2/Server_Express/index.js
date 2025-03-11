const express = require('express');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'VariablesDeEntorno/.env') });
const winston = require('winston');

let PORT = process.env.PORT;

const app = express();
const routerUsuario = require('./Router/usuarioRouter.js');
const e = require('express');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: __dirname + '/logs/error.log'})
    ]
});

// Middleware para parsear el body de las peticiones
app.use(express.json());
app.use(express.text());
app.use(xmlparser());
app.use(cors());

app.use('/usuarios', routerUsuario);

app.use((err,res,req,next) => {
    logger.error(err.message, {stack: err.stack});
    res.status(500).send({error:error.message});
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status:err.status,
        mensaje:err.mensaje
    })
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});