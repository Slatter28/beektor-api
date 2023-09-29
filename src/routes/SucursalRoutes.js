const sucursalController = require('../controllers/SucursalController');

const express = require('express');

const router = express.Router();


router.get('/', sucursalController.getSucursales);
router.get('/:id', sucursalController.getSucursal);
router.post('/', sucursalController.crearSucursal);
router.put('/:id', sucursalController.actualizarSucursal);
router.delete('/:id', sucursalController.eliminarSucursal);

module.exports = router;