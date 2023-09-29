const clienteController = require('../controllers/ClienteController');

const express = require('express');
const { validarJWT, validarCampos } = require('../middlewares/validar-JWT');

const router = express.Router();


router.get('/', [validarJWT, validarCampos], clienteController.getClientes);
router.get('/:id', clienteController.getCliente);
router.post('/', clienteController.crearCliente);
router.put('/:id', clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;