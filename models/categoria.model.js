var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var categoriaSchema=new Schema({
    name:Schema.Types.String,
    descripcion:Schema.Types.String,


}, {collection:'categorias'})

module.exports=mongoose.model('categoria',categoriaSchema);