// Rutas para producto
const express = require('express');
const router = express.Router();
const sensoresController = require('../controllers/SensoresController');


router.get('/', sensoresController.getSensores);
router.get('/:id', sensoresController.getSensor);
router.post('/', sensoresController.crearSensor);

router.get('/lastSensorByColmena/:id', sensoresController.getLastSensorByColmena);



module.exports = router;