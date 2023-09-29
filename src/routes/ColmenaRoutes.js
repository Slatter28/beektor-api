const colmenaController = require('../controllers/ColmenaController');

const express = require('express');
const { validarJWT, validarCampos } = require('../middlewares/validar-JWT');

const router = express.Router();


router.get('/', colmenaController.getColmenas);

router.get('/myColmenas', [validarJWT, validarCampos], colmenaController.getMyColmenas);

router.get('/solicitudes', colmenaController.getColmenasSolicitud);

router.get('/:id', colmenaController.getColmena);

router.post('/', [validarJWT, validarCampos], colmenaController.crearColmena);

router.put('/:id', colmenaController.actualizarColmena);

router.delete('/:id', colmenaController.eliminarColmena);

router.put('/solicitud/:id', [validarJWT, validarCampos], colmenaController.aceptarColmena);

router.put('/rechazar/:id', [validarJWT, validarCampos], colmenaController.rechazarColmena);

router.put('/cambiarEstado/:id', [validarJWT, validarCampos], colmenaController.cambiarEstadoColmena);

module.exports = router;