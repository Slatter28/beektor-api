const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos, checkStatus } = require('../middlewares/validar-JWT');
const usuarioController = require('../controllers/UsuarioController');

const router = Router();

router.post('/',
    [
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], usuarioController.crearUsuario
);

router.post('/login',
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], usuarioController.loginUsuario
);


router.post('/check-status', checkStatus, usuarioController.renewToken);

router.get('/', usuarioController.getUsuarios);


module.exports = router;