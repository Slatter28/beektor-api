const mongoose = require('mongoose');


const ClienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('cliente', ClienteSchema, 'Cliente')