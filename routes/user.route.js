var express = require('express');

var api=express.Router();
var multipart=require('connect-multiparty')

var userController= require('../controllers/user.controller');

var Auth=require('../middlewares/authenticad');

var path=multipart({uploadDir:'./upload'});

api.post('/user', userController.register);

api.post('/login', userController.login);


api.put('/update-user/:id', Auth.ensureAuth,userController.updateUser);

api.put('/upload-image/:id',path,userController.uploadImage);
api.get('/get-image-user/:imageFile',path,userController.getImageFile);

api.get('/users', userController.getUsers);



module.exports=api;