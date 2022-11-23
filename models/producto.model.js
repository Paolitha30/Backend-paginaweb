var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var productoSchema=new Schema({
    nombre:Schema.Types.String,
    precio:Schema.Types.Number,
    cantidad:Schema.Types.Number,
    vencimiento:Schema.Types.Date,
    ven:Schema.Types.String,
    imagen: Schema.Types.String,
    idCategoria:{type:Schema.ObjectId,ref:'categoria'}
},{collection:"Productos"});

module.exports=mongoose.model('productos',productoSchema);