const express = require('express');
const router = express.Router();
const hal = require('hal');
const halson = require('halson');
const usuarioController = require('../Controller/usuarioController.js');

router.get('/', (req, res) => {
    let opciones = {
        titulo: 'Lista de Usuarios',
        mensaje: 'Aquí puedes ver la lista de usuarios'
    };
    res.render('index', opciones); // Renderiza "index.pug" dentro de "views"
});
router.get('/', usuarioController.consultarUsuario);
router.post('/', usuarioController.agregarUsuario); 

module.exports = router;