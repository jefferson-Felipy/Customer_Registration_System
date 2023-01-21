const express = require('express');
const Crud = express.Router();
const mongoose = require('mongoose');
require('../models/Clientes');
const Cliente = mongoose.model('clientes');

//Verificando se é eAdmin_
const {eAdmin} = require('../helpers/eAdmin');

//rota responsável por exibir o crud dos clientes_
Crud.get('/crud',eAdmin,(req,res) => {
    Cliente.find().lean().sort({date:'desc'}).then(clientes => {
        res.render('crud/crud',{clientes:clientes});
    }).catch(err => {
        req.flash("error_msg","Erro ao exibir lista de clientes!");
        res.redirect('/crud');
    });
});

//Rota responsável por cadastrar os clientes no banco de dados_
Crud.post('/cadClientes',(req,res) => {
    const newCliente = {
        name: req.body.name,
        email: req.body.email,
        profession: req.body.profession,
        telephone:req.body.telephone,
        cep:req.body.cep
    }

    new Cliente(newCliente).save().then(() => {
        req.flash("success_msg","Sucesso ao ao salvar cliente!");
        res.redirect('/crud');
    }).catch(err => {
        req.flash("error_msg","Erro ao salvar cliente!, os campos são obrigatorios!");
        res.redirect('/crud');
    });
});

//Rota responsável por deletas os dados do banco de dados_
Crud.get('/delete/:email',(req,res) => {//nao é necessário o where para deletar;
    Cliente.deleteOne({email: req.params.email}).then(() => {
        req.flash("success_msg","Sucesso ao deletar cliente!");
        res.redirect('/crud');
    }).catch(err => {
        req.flash("error_msg","Erro ao deletar cliente!");
        res.redirect('/crud');
    });
});

//Rotas responsáveis por editar dados do cliente_
Crud.get('/update/:id',eAdmin,(req,res) => {
    Cliente.findOne({_id:req.params.id}).lean()
    .then(cliente => {
        res.render('crud/updateCrud',{cliente:cliente});
    }).catch(err => {
        req.flash("error_msg","Error ao exibir dados do cliente!");
        res.redirect('/crud');
    });
});

//
Crud.post('/successupdate',eAdmin,(req,res) => {
    let erros = [];

    if((req.body.name == '') || (typeof req.body.name == undefined) || (req.body.name == null)){
        erros.push({texto: 'Name está incorreto!'});
    }
    else if(req.body.name.length < 2){
        erros.push({texto: 'Name muito pequeno!'});
    }//-----------------------------
    
    else if((req.body.email == '') || (typeof req.body.email == undefined) || (req.body.email == null)){
        erros.push({texto: 'Email está incorreto!'});
    }
    else if(req.body.email.length < 2){
        erros.push({texto: 'Email muito pequeno!'});
    }//-----------------------------

    else if((req.body.profession == '') || (typeof req.body.profession == undefined) || (req.body.profession == null)){
        erros.push({texto: 'Email está incorreto!'});
    }
    else if(req.body.profession.length < 2){
        erros.push({texto: 'Email muito pequeno!'});
    }//-----------------------------

    else if((req.body.telephone == '') || (typeof req.body.telephone == undefined) || (req.body.telephone == null)){
        erros.push({texto: 'Email está incorreto!'});
    }//-----------------------------

    else if((req.body.cep == '') || (typeof req.body.cep == undefined) || (req.body.cep == null)){
        erros.push({texto: 'Email está incorreto!'});
    }
    else if(req.body.cep.length < 5){
        erros.push({texto: 'Email muito pequeno!'});
    }//-----------------------------

    if(erros.length > 0){
        res.render('crud/updateCrud',{erros:erros});
    }
    else{
        Cliente.findOne({email: req.body.email}).then(cliente => {
            cliente.name = req.body.name,
            cliente.email = req.body.email,
            cliente.profession = req.body.profession,
            cliente.telephone = req.body.telephone,
            cliente.cep = req.body.cep
            
            cliente.save().then(() => {
                req.flash("success_msg","Sucesso ao atualizar dados do cliente!");
                res.redirect('/crud');
            }).catch(err => {
                req.flash("error_msg","Error ao atualizar dados do cliente!: "+err);
                res.redirect('/crud');
            });

        }).catch(err => {
                req.flash("error_msg","Error ao executar sistema de atualização: "+err);
                res.redirect('/crud');
        });
    }
});

//rota responável pelo Logout do usuario na aplicação_
Crud.get('/logout',(req,res,next) => {
    req.logout(err => {
        if(err)
        {
            return next(err);
        }
        req.flash("success_msg","Deslogado com sucesso!");
        res.redirect('/login');
    });
});


module.exports = Crud;