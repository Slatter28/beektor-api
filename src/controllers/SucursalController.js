const sucursalModel = require('../models/Sucursal');

const getSucursales = async (req, res) => {
    try {
        const sucursales = await sucursalModel.find();
        res.json(sucursales);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}


const getSucursal = async (req, res) => {
    try {

        const sucursal = await sucursalModel.findById(req.params.id);

        if (!sucursal) {
            res.status(404).json({ msg: 'No existe la sucursal' })
        }

        res.json(sucursal);


    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

const crearSucursal = async (req, res) => {
    try {
        const { nombre, direccion, telefono, gerente, horario } = req.body;

        const sucursal = new sucursalModel({
            nombre,
            direccion,
            telefono,
            gerente,
            horario
        });

        await sucursal.save();

        res.json(sucursal);


    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

const actualizarSucursal = async (req, res) => {

    try {
        const { nombre, direccion, telefono, gerente, horario } = req.body;

        let sucursal = await sucursalModel.findOneAndUpdate({ _id: req.params.id }, {
            nombre,
            direccion,
            telefono,
            gerente,
            horario
        }, { new: true });

        if (!sucursal) {
            res.status(404).json({ msg: 'No existe la sucursal' })
        }

        res.json(sucursal);

    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

const eliminarSucursal = async (req, res) => {

    try {
        const sucursal = await sucursalModel.findById(req.params.id);

        if (!sucursal) {
            res.status(404).json({ msg: 'No existe la sucursal' })
        }

        await sucursalModel.findOneAndRemove({ _id: req.params.id });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

module.exports = {
    getSucursales,
    getSucursal,
    crearSucursal,
    actualizarSucursal,
    eliminarSucursal
}


