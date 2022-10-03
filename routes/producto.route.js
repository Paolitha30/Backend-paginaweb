'use strict'

var express= require('express');

var api = express.Router();

var controllerProducto=require('../controllers/producto.controller');

api.get('/productos', controllerProducto.getAll);
api.post('/savePro',controllerProducto.insertProducto);
api.get('/producto/:id', controllerProducto.getProductos);

module.exports=api;