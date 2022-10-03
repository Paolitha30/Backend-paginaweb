'use strict'

var mongoose= require('mongoose');

var app=require('./app');

var port=3700;
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/pagina2')
                .then(()=>{
                    console.log('Conexión a la bd establecida con exito!');

                    //Arrancar servidor
                    app.listen(port, ()=>{
                        console.log('Servidor corriendo correctamente en la url localhost:3700');
                    });


                }).catch(err=> console.log(err));
