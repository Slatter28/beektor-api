const productoController = require('../controllers/ProductoController');

const express = require('express');

const router = express.Router();


router.get('/', productoController.getProductos);

router.get('/:id', productoController.getProducto);

router.post('/', productoController.crearProducto);

router.put('/:id', productoController.actualizarProducto);

router.delete('/:id', productoController.eliminarProducto);

module.exports = router;