const express=require('express');
const router = express.Router();
const usuarioController =require('../Controllers/usuarioController.js');

router.get('/', usuarioController.consultarUsuario);

moduke.exports.router=router;