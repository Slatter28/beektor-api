const sensoresModels = require("../models/Sensores");
const { emitId } = require("../sockets/controller");
const colmenasModels = require("../models/Colmena");

const getSensores = async (req, res) => {

    try {

        const sensor = await sensoresModels.find().populate("colmena");
        res.json(sensor)

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

const getSensor = async (req, res) => {
    try {
        let sensor = await sensoresModels.findById(req.params.id);

        if (!sensor) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        res.json(sensor);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

const crearSensor = async (req, res) => {
    try {
        const { temperatura, humedad, colmena } = req.body;
        console.log(req.body);

        const sensor = new sensoresModels({
            temperatura,
            humedad,
            colmena
        });

        const findUsuarioColmena = await colmenasModels.findById(colmena).populate("usuario");

        const id = findUsuarioColmena.usuario._id.toHexString();

        console.log(id);

        emitId(id, sensor);

        // await sensor.save();

        res.json(sensor);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

const getLastSensorByColmena = async (req, res) => {
    try {
        const { id } = req.params;

        const sensor = await sensoresModels.findOne({ colmena: id }).sort({ _id: -1 }).populate("colmena");

        res.json(sensor);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}


module.exports = {
    getSensores,
    getSensor,
    crearSensor,
    getLastSensorByColmena
}