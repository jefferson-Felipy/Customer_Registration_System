//model express e o Router_
const express = require('express');
const User = express.Router();

//Model de cadastro dos usuarios_
const mongoose = require('mongoose');
require('../models/Usuarios');
const Usuario = mongoose.model('usuarios');

const passport = require('passport');
const bcrypt = require('bcryptjs');

//Rota responsável por renderizar o formulário de cadastro_
User.get('/cadastrar',(req,res) => res.render('formularios/formcadastro'));

//Rota responsável por cadastrar os usuarios no banco de dados_
User.post('/cadastro',(req,res) => {
    let erros = [];

    if((req.body.name == '') || (typeof req.body.name == undefined) || (req.body.name == null)){
        erros.push({texto: 'Name está incorreto!'});
    }
    else if(req.body.name.length < 2){
        erros.push({texto: 'Name muito pequeno!'});
    }//-----------------------------
    
    else if((req.body.age == '') || (typeof req.body.age == undefined) || (req.body.age == null)){
        erros.push({texto: 'Age está incorreto!'});
    }//-----------------------------

    else if((req.body.email == '') || (typeof req.body.email == undefined) || (req.body.email == null)){
        erros.push({texto: 'Email está incorreto!'});
    }
    else if(req.body.email.length < 2){
        erros.push({texto: 'Email muito pequeno!'});
    }//-----------------------------

    else if((req.body.password == '') || (typeof req.body.password == undefined) || (req.body.password == null)){
        erros.push({texto: 'Password está incorreto!'});
    }
    else if((req.body.password.length < 6) || (req.body.password.length > 12)){
        if(req.body.password.length < 6)
            erros.push({texto: 'Password está muito pequena!'});
        else if(req.body.password.length > 12)
            erros.push({texto: 'Password está muito grande!'});
    }
    else if(req.body.password != req.body.password2){
        erros.push({texto: 'Password estao diferentes!'});
    }//-----------------------------

    if(erros.length > 0){
        res.render('formularios/formcadastro',{erros:erros});
    }
    else{
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                req.flash("error_msg","Email já cadastrado, faça login!");
                res.redirect('/cadastrar');
            }
            else{
                const newUser = {
                    name: req.body.name,
                    age: req.body.age,
                    email:req.body.email,
                    password:req.body.password
                }

                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err){
                            req.flash("error_msg","Error ao salvar senha do usuario!");
                            res.redirect('/cadastrar');
                        }

                        newUser.password = hash;

                        new Usuario(newUser).save().then(() => {
                            req.flash("success_msg","Sucesso ao se cadastrar!");
                            res.redirect('/cadastrado');
                    }).catch(err =>{
                            req.flash("error_msg","Error ao se cadastrar!: "+err);
                            res.redirect('/cadastrar');
                        });
                    });
                });
            }
        }).catch(err =>{
            req.flash("error_msg","Error ao Encontrar usuario!");
            res.redirect('/cadastrar');
        });
    }
});

//Rota responsável por exibir a mensagem de usuario cadastrado apos o cadastro_
User.get('/cadastrado',(req,res) => res.render('formularios/cadastrado'));

//Rota responsável por autenticar o usuario que estar tentando logar na aplicação_
User.post('/',(req,res,next) => {
    passport.authenticate("local",{
        successRedirect: '/crud',
        failureRedirect: '/',
        failureFlash: true
    })(req,res,next);
});

//rota responável pelo Logout do usuario na aplicação_
User.get('/logout',(req,res,next) => {
    req.logout(err => {
        if(err)
        {
            return next(err);
        }
        req.flash("success_msg","Deslogado com sucesso!");
        res.redirect('/');
    });
});

module.exports = User;