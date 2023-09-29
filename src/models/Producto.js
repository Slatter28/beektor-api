const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'proveedor',
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('producto', ProductoSchema, 'Producto')