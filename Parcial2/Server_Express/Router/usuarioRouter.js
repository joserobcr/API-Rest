const express = require('express');
const router = express.Router();
const hal = require('hal');
const usuarioController = require('../Controller/usuarioController.js');

router.get('/', usuarioController.consultarUsuario);
router.post('/', usuarioController.agregarUsuario); 

module.exports = router;