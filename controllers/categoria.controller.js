var Categoria=require('../models/categoria.model');


function insertCategoria(req, res){
    var params= req.body;

    var categoria=new Categoria();
    categoria.name=params.name;
    categoria.descripcion=params.descripcion;

    Categoria.save((err, categoria)=>{
        if(err)return res.status(500).send({message:"Error en el servidor"});
        if(!categoria)return res.status(404).send({message:"Error al guardar"});
        if(categoria)return res.status(200).send({category:categoria});
    })
}
module.exports ={
    insertCategoria
}