const productoModel = require('../models/Producto');

const getProductos = async (req, res) => {
    try {
        const productos = await productoModel.find().populate('proveedor');
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

const getProducto = async (req, res) => {
    try {

        const producto = await productoModel.findById(req.params.id).populate('proveedor');

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        res.json(producto);

    } catch (error) {
        res.status(500).send('Error en el servidor');

    }
}

const crearProducto = async (req, res) => {
    try {
        const { nombre, detalle, stock, precio, categoria, proveedor } = req.body;

        const producto = new productoModel({
            nombre,
            detalle,
            precio,
            categoria,
            proveedor,
            stock
        });

        await producto.save();

        res.json(producto);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}


const actualizarProducto = async (req, res) => {
    try {

        const { nombre, detalle, stock, precio, categoria, proveedor } = req.body;

        let producto = await productoModel.findOneAndUpdate({ _id: req.params.id }, {

            nombre,
            detalle,
            precio,
            categoria,
            proveedor,
            stock
        }, { new: true });

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        res.json(producto);

    } catch (error) {

        res.status(500).send('Error en el servidor');

    }

}


const eliminarProducto = async (req, res) => {
    try {

        let producto = await productoModel.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await productoModel.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {

        res.status(500).send('Error en el servidor');

    }
}

module.exports = {
    getProductos,
    getProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}