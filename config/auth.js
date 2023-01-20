const localStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

//Model de usuarios_
require('../models/Usuarios');
const Usuario = mongoose.model('usuarios');

module.exports = (passport) => {
    //para que essa autenticação funcione, a senha precisa estar hasheada;
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'},//essa senha precisa ser exatamente igual ao campo name do formLogin;
        (email,password,done) => {
            //Aqui ele verifica se o email ja existe ou nao_
            Usuario.findOne({email: email}).then(usuario => {
                if(!usuario)
                {
                    return done(null,false,{message: 'Essa conta nao existe, tente novamente ou cadastre-se!'});
                }

                //Aqui verifica se as senhas sao iguais ou nao_
                bcryptjs.compare(password,usuario.password,(err,batem) => {
                    if(batem){
                        return done(null,usuario);
                    }
                    else{
                        return done(null,false,{message: 'senha incorreta!'});
                    }
                });
            });
    }));

    passport.serializeUser((usuario,done) => {
        done(null,usuario._id);
    });

    passport.deserializeUser((id,done) => {
        Usuario.findById(id,(err,usuario) => {
            done(null,usuario);
        });
    });
}