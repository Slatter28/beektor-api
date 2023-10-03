
const express = require('express');
const { validarJWT, validarCampos } = require('../middlewares/validar-JWT');

const dashboardController = require('../controllers/DashboardController');

const router = express.Router();


router.get('/', [validarJWT, validarCampos], dashboardController.getDashboard);


module.exports = router;