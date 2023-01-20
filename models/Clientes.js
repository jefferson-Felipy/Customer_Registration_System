const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cliente = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
    cep:{
        type: String,
        required: true
    }

});

mongoose.model('clientes',Cliente);

module.exports = Cliente;