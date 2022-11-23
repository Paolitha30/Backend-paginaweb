'use strict'

const multipart = require('connect-multiparty');
var express= require('express');

var api = express.Router();

var controllerProducto=require('../controllers/producto.controller');
var path=multipart({uploadDir:"./upload/productos"});

api.get('/productos', controllerProducto.getAll);
api.post('/savePro', path, controllerProducto.insertProducto);
api.get('/producto/:id', path, controllerProducto.getProductos);
//Traer la imagen
api.get('/traerImagen/:imagen', controllerProducto.traerImagen);
api.delete('/delete-producto/:id', controllerProducto.deleteProducto);
api.put('/updateProducto/:id',path, controllerProducto.updateProducto);
api.get('/prod/:name?',  controllerProducto.getProductsName);

module.exports=api;