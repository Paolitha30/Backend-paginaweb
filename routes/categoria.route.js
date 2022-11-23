
'use strict'

var express= require('express');

var api = express.Router();

var controllerCategoria=require('../controllers/categoria.controller');

api.post('/categoria', controllerCategoria.insertCategoria);
api.get('/categorias', controllerCategoria.getCategorias);

module.exports=api;
