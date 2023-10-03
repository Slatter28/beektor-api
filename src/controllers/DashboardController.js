const colmenaModel = require("../models/Colmena");
const proveedorModel = require('../models/Proveedor');
const usuarioModel = require('../models/Usuario');
const sensorModel = require('../models/Sensores');


getDashboard = async (req, res) => {

    const colmenasVendidas = await colmenaModel.find({
        solicitud: true
    });
    const proveedores = await proveedorModel.find();
    const usuarios = await usuarioModel.find();
    const sensores = await sensorModel.find();

    res.json({
        ok: true,
        colmenasVendidas,
        proveedores,
        usuarios,
        sensores
    });
}


module.exports = {
    getDashboard
}