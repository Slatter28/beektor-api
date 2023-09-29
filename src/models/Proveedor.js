const mongoose = require('mongoose');

const ProveedorSchema = mongoose.Schema({
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
    }
});


module.exports = mongoose.model('proveedor', ProveedorSchema, 'Proveedor')