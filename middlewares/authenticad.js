var jwt=require('jwt-simple');
var clave="clave-secreta";
var moment=require('moment');

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'La cabecera no tiene autenticación'});

    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    try {
        var payload=jwt.decode(token,clave);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:'El token ha expirado'});
            
            }
    } catch (error) {
        return res.status(404).send({message:'Token no valido'});

    }
    req.user=payload;
    next();
}