'use strict'


var express= require('express');
var bodyParser=require('body-parser');
//archivos de rutas rutas 
var productoRoute=require('./routes/producto.route');
//middlewares se ejecuta antes de la acción de un controlador


var categoriaRoute=require('./routes/categoria.route');
//middlewares se ejecuta antes de la acción de un controlador


var userRoute=require('./routes/user.route');
//middlewares se ejecuta antes de la acción de un controlador
var app= express();






//CONFIGURACION
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use("/api",productoRoute);
app.use("/api",categoriaRoute);
app.use("/api",userRoute); 


module.exports=app;



