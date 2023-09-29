const mongoose = require('mongoose');

const SucursalSchema = mongoose.Schema({
    nombre: {
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
    gerente: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('sucursal', SucursalSchema, 'Sucursal')