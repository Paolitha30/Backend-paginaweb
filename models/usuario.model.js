
var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:Schema.Types.String,
    email: Schema.Types.String,
    password: Schema.Types.String,
    image: Schema.Types.String,
    roles: Schema.Types.String,
}, {collection: 'Users'});

module.exports = mongoose.model('users',userSchema);