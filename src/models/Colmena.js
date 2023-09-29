const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ColmenaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    estado: {
        type: Boolean,
        required: true
    },
    produccion: {
        type: Number,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    observacion: {
        type: String,
        required: true
    },
    solicitud: {
        type: Boolean,
        required: true
    },
    productoTemperatura: {
        type: Schema.Types.ObjectId,
        ref: 'producto',
        required: true
    },
    productoHumedad: {
        type: Schema.Types.ObjectId,
        ref: 'producto',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
});

module.exports = mongoose.model('colmena', ColmenaSchema, 'Colmena')