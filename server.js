const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./routes/User');
const Crud = require('./routes/Crud');

//model do passport_
const passport = require('passport');
require('./config/auth')(passport);

//Confgurando o express-session_
app.use(session({
    secret: 'node12345',
    resave:true,
    saveUninitialized:true
}));

//Configurando a Ferramenta Passport_
//Devido a hierarquia dds Middlewares, o passport deve ser configurado depois do session e antes
//do flash;
app.use(passport.initialize());
app.use(passport.session());

//configurando o connect-flash_
app.use(flash());

//Configurando os middwares_
app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    res.locals.error_adm = req.flash("error_adm");
    next();
});

//Configurando o Template Engine do Handlebars_
app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//Configurando o Body-Parser_
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Configurando o Mongoose_
mongoose.connect('mongodb://localhost/cadastro_de_clientes')
.then(() => console.log('Conexão com o banco de dados bem sucedida!'))
.catch(err => console.log('Erro ao se conectar com o banco de dados: '+err));

//Configurando os arquivos estáticos_
app.use(express.static(path.join(__dirname+'/public')));

//configurando a rota principal_
app.get('/',(req,res) => res.render('formularios/formLogin'));
app.use('/',User);
app.use('/',Crud);

//Configurando o servidor express_
const PORT = 8081;
app.listen(PORT,() => console.log('Servidor rodando na porta: http://localhost/8081'));