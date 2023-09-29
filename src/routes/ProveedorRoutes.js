const proveedorController = require('../controllers/ProveedorControler');

const express = require('express');

const router = express.Router();


router.get('/', proveedorController.getProveedores);

router.get('/:id', proveedorController.getProveedor);

router.post('/', proveedorController.crearProveedor);

router.put('/:id', proveedorController.actualizarProveedor);

router.delete('/:id', proveedorController.eliminarProveedor);

module.exports = router;