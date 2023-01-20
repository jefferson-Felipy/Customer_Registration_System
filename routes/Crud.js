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
        res.redirect('/crud/crud');
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
        res.redirect('/crud/crud');
    }).catch(err => {
        req.flash("error_msg","Erro ao salvar cliente!: "+err);
        res.redirect('/crud/crud');
    });
});

//Rota responsável por deletas os dados do banco de dados_
Crud.get('/delete/:email',(req,res) => {//nao é necessário o where para deletar;
    Cliente.deleteOne({email: req.params.email}).then(() => {
        req.flash("success_msg","Sucesso ao deletar cliente!");
        res.redirect('/crud/crud');
    }).catch(err => {
        req.flash("error_msg","Erro ao deletar cliente!");
        res.redirect('/crud/crud');
    });
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