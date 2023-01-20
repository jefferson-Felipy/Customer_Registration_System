const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = Schema({
    name:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    eAdmin: {
        type:Number,
        default:1
    },
    password:{
        type:String,
        required:true
    }
});

mongoose.model('usuarios',Usuario);

module.exports = Usuario;