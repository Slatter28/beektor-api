const mongoose = require('mongoose');

const Usuario = mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('usuario', Usuario, 'Usuario');