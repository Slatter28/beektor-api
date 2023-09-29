const ClienteModel = require('../models/Cliente');

const getClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.find();
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

const getCliente = async (req, res) => {
    try {
        let cliente = await ClienteModel.findById(req.params.id);

        if (!cliente) {
            res.status(404).json({ msg: 'No existe el cliente' })
        }
        res.json(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

const crearCliente = async (req, res) => {
    try {

        const { nombre, apellido, cedula, direccion, telefono, correo } = req.body;

        const Cliente = new ClienteModel({
            nombre,
            apellido,
            cedula,
            direccion,
            telefono,
            correo
        });

        await Cliente.save();

        res.json(Cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}


const actualizarCliente = async (req, res) => {

    try {

        const { nombre, apellido, cedula, direccion, telefono, correo } = req.body;

        let cliente = await ClienteModel.findOneAndUpdate({ _id: req.params.id }, {
            nombre,
            apellido,
            cedula,
            direccion,
            telefono,
            correo
        }, { new: true });

        if (!cliente) {
            res.status(404).json({ msg: 'No existe el cliente' })
        }

        res.json(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}

const eliminarCliente = async (req, res) => {

    try {

        const cliente = await ClienteModel.findById(req.params.id);

        if (!cliente) {
            res.status(404).json({ msg: 'No existe el cliente' })
        }

        await ClienteModel.deleteOne({ _id: req.params.id });

        res.json({ msg: 'Cliente eliminado correctamente' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}


module.exports = {
    getClientes,
    getCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}
