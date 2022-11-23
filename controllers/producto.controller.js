
var producto= require('../models/producto.model');
var fs = require('fs');
var path = require('path');



var controller ={
getProductos:(req, res)=>{
    var id=req.params.id;
    producto.findById(id).populate({path:'idCategoria'}).exec(
        (err, productos)=>{
        if(err) return res.status(500).send({message:"error en el servidor"+err})
        if(!productos) return res.status(404).send({message:"no se encontraron productos"})
        if(productos)return res.status(200).send({producto:productos});
    });
},



insertProducto:(req, res)=>{
     var params= req.body;
     var prod=new producto();
     var image_name=null;

    if(req.files !=undefined){
        if (req.files.imagen.name!=""){
          var imagen_path=req.files.imagen.path;
          var name = imagen_path.split("\\");
          image_name = name[2];
        }
    }
    prod.nombre=params.nombre;
    prod.precio=params.precio;
    prod.cantidad=params.cantidad;        
    prod.vencimiento= params.vencimiento;
    prod.imagen=image_name;
    prod.ven= params.ven;
    prod.idCategoria=params.idCategoria;
    console.log(params);
    prod.save((err, prodSaved)=>{
        if(err) return res.status(500).send({message:"Error en el servidor"+err});
        if(!prodSaved) return res.status(404).send("El producto no ha sido guardado");
        if(prodSaved) return res.status(200).send({producto:prodSaved});

    });
},

traerImagen(req, res){
    var imagen = req.params.imagen;
    var pathFile = './upload/productos/' + imagen;
    console.log(pathFile);
    fs.access(pathFile, (err)=>{
        if(err){
           console.log(err); 
        }
        if(!err){
            res.sendFile(path.resolve(pathFile));
        }
        else{
            res.status(404).send({message: 'No se puede acceder a la imagen...'});
        }
    });

    
},

getAll(req,res){
    producto.find((err,productos)=>{
        if(err)return res.status(500).send("Error en el servidor");
        if(!productos)return res.status(404).send("No se encontraron productos");
        if(productos) return res.status(200).send({productos:productos});

    });  
},

deleteProducto:(req, res)=>{
let id = req.params.id;
producto.findByIdAndRemove(id, (err,producto)=>{
    if(err)return res.status(500).send({message:"Error en el servidor"});
    if(!producto)return res.status(404).send({message:"No se elimino el producto"});
    if(producto)return res.status(200).send({producto:producto});
});

},

getProductsName:(req, res)=>{
     
    var nombre =req.params.name;

    producto.find({nombre:new RegExp(nombre,'i')}).populate({path:'idCategoria'}).exec(
        (err, products) => {
            if(err) return res.status(500).send({message:"Error en el servidor"+err});
            if(!products) return res.status(404).send("No se encontraron registros");
            if(products) return res.status(200).send({products:products});
        }
    );
},

updateProducto:(req, res)=>{
    var id = req.params.id;
    var params= req.body;
    var image_name=null;

    if(req.files !=undefined){
        if (req.files.imagen){
          var imagen_path=req.files.imagen.path;
          var name = imagen_path.split("\\");
          image_name = name[2];
        }
    }

    if(image_name!= null) params.imagen=image_name;
   
    console.log(params);
    producto.findByIdAndUpdate(id,params,{new:true},(err, prodUpdate)=>{
        if(err) return res.status(500).send({message:"Error en el servidor"+err});
        if(!prodUpdate) return res.status(404).send("El producto no ha sido guardado");
        if(prodUpdate) return res.status(200).send({producto:prodUpdate});

    });
},



}

module.exports= controller;