
var producto= require('../models/producto.model');



var controller ={
getProductos:(req, res)=>{
    producto.find((err, productos)=>{
        if(err) return res.status(500).send({message:"error en el servidor"+err})
        if(!productos) return res.status(404).send({message:"no se encontraron productos"})
        if(productos)return res.status(200).send({productos:productos});
    });
},



insertProducto:(req, res)=>{
    var prod=new producto();
    var params= req.body;
    prod.nombre=params.nombre;
    prod.precio=params.precio;
    prod.cantidad=params.cantidad;        
    prod.vencimiento= params.vencimiento;
    prod.ven= params.ven;
    prod.idCat=params.idCat;
    console.log(params);
    prod.save((err, prodSaved)=>{
        if(err) return res.status(500).send({message:"Error en el servidor"+err});
        if(!prodSaved) return res.status(404).send("El producto no ha sido guardado");
        if(prodSaved) return res.status(200).send({producto:prodSaved});

    });
},

getAll(req,res){
    producto.find((err,productos)=>{
        if(err)return res.status(500).send("Error en el servidor");
        if(!productos)return res.status(404).send("No se encontraron productos");
        if(productos) return res.status(200).send({productos:productos});

    });
}

}

module.exports= controller;