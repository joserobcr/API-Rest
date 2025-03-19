const express = require('express');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'VariablesDeEntorno/.env') });
const winston = require('winston');

let PORT = process.env.PORT;

const app = express();
const routerUsuario = require('./Router/usuarioRouter.js');

// Configurar logger
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, 'logs/error.log') })
    ]
});

// Middleware para parsear el body de las peticiones
app.use(express.json({ limit: '1mb' }));
app.use(express.text({ limit: '1mb' }));
app.use(xmlparser());
app.use(cors());

// Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 

// Rutas de usuario
app.use('/usuarios', routerUsuario);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: err.message });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});