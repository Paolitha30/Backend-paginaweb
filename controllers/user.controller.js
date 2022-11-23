

var User=require('../models/usuario.model');

var bcrypt = require('bcrypt-nodejs');
var jwt=require('../services/jwt');        
var fs=require('fs');
var path=require('path');

function register(req,res){

    var params=req.body;
    var user =new User();

    user.name=params.name;
    user.email=params.email;
    user.role="ADMIN";
    user.image='NULL';

    if(params.password){
        bcrypt.hash(params.password,null,null,(err,hash)=>{
            user.password=hash;

            user.save((err,userSave)=>{
                if(err) return res.status(500).send({message:"Error en el servidor"+err})
                if(!userSave)return res.status(404).send({message:"No se pudo guardar el user"});
                if (userSave)return res.status(200).send({user:userSave});  
            })
        });

    }

} 


function login(req,res){
var params=req.body;
var email=params.email;
var password=params.password;


User.findOne({email:email},(err,user)=>{
    if(err)return res.status(500).send({message:"error en el servidor"+err});
    if(!user)return res.status(404).send({message:"no se encontro el usuario" + err});
    if(user){
        bcrypt.compare(password,user.password,function(err,check){
            if(check){

                if(params.gethash){
                    return res.status(200).send({token:jwt.createToken(user)})
                }else{
                    res.status(200).send({user:user});
                }
                
            }
    })
}
})

}

function updateUser(req, res){
    let id=req.params.id;
    let params=req.body;

    if(req.user.sub!=id){
        return res.status(400).send({message: "No esta autorizado"});

    }
    User.findByIdAndUpdate(id,params,(err,userupdate)=>{
        if(err) return res.status(500).send({message:"Error en el servidor"+err})
                if(!userupdate)return res.status(404).send({message:"No se pude actualizar el usuario"});
                if (userupdate)return res.status(200).send({user:userupdate}); 
    });
}



function uploadImage(req, res) {
    var id= req.params.id;
    var file_name="Imagen no encontrada o subida";
    if(req.files){
        var file_path= req.files.imagen.path;
        var file_split= file_path.split("\\");
           file_name=file_split[1];       
        var ext_split=file_name.split('\.');
        var file_ext=ext_split[1];
       

        if(file_ext== 'png'|| file_ext=='jpg'||file_ext=='gif'){

            User.findByIdAndUpdate(id,{image:file_name},{new:true},(err,user)=>{
                if(err)return res.status(500).send({message:err})
                if(!user)return res.status(404).send({message:"No se pudo actualizar el usuario"});
                if(user)return res.status(200).send({user:user}); 
         
            });
        }else{
            res.status(404).send({message:'Extensión del archivo no valida'});

        }

        
            
    }

}

    function getImageFile(req, res){
        var imageFile=req.params.imageFile;
        var pathFile='./upload/'+imageFile;
        console.log(pathFile);
        fs.access(pathFile, function(err){
            if(err) console.log(err);
            if(!err){
                res.sendFile(path.resolve(pathFile));
            }else{
                res.status(404).send({message:'No se puede acceder a  la imagen...'});
    
            }
        })

    }

    function getUsers(req, res) {
        User.find((err,users)=>{
            if(err)return res.status(500).send({message:'Error en el servidor' + err});
            if(!users)return res.status(404).send({message:"No se encontraron usuarios"});
            if(users)return res.status(200).send({users:users}); 
        })
    }

module.exports ={
    register,
    updateUser,
    login,
    uploadImage,
    getImageFile,
    getUsers
    

}

