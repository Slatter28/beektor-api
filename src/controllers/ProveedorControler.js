const proveedorModel = require('../models/Proveedor');

const getProveedores = async (req, res) => {
    try {
        const proveedores = await proveedorModel.find();
        res.json(proveedores);
    }
    catch (error) {
        res.status(500).send('Error en el servidor');
    }
}


const getProveedor = async (req, res) => {

    try {
        const proveedor = await proveedorModel.findById(req.params.id);

        if (!proveedor) {
            res.status(404).json({ msg: 'No existe el proveedor' })
        }

        res.json(proveedor);

    } catch (error) {

        res.status(500).send('Error en el servidor');

    }

}




const crearProveedor = async (req, res) => {

    try {
        const { nombre, direccion, telefono } = req.body;

        const proveedor = new proveedorModel({
            nombre,
            direccion,
            telefono,
        });

        await proveedor.save();

        res.json(proveedor);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

const actualizarProveedor = async (req, res) => {

    try {

        const { nombre, direccion, telefono } = req.body;

        let proveedor = await proveedorModel.findOneAndUpdate({ _id: req.params.id }, {

            nombre,
            direccion,
            telefono

        }, { new: true });

        res.json(proveedor);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}


const eliminarProveedor = async (req, res) => {

    try {

        let proveedor = await proveedorModel.findById(req.params.id);

        if (!proveedor) {
            res.status(404).json({ msg: 'No existe el proveedor' })
        }

        await proveedorModel.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: 'Proveedor eliminado con exito' });

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}


module.exports = {
    getProveedores,
    getProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
}