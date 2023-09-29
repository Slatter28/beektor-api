const colmenaModel = require("../models/Colmena");

const getColmenas = async (req, res) => {
    try {
        const colmenas = await colmenaModel.find().populate("productoTemperatura").populate("productoHumedad").populate("usuario");
        res.json(colmenas);
    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
};

const getMyColmenas = async (req, res) => {
    try {
        const usuarioId = req.usuario._id;

        const colmenas = await colmenaModel.find({ usuario: usuarioId }).populate("productoTemperatura").populate("productoHumedad").populate("usuario");

        res.json(colmenas);

    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
}

const getColmenasSolicitud = async (req, res) => {
    try {
        const colmenas = await colmenaModel.find({ solicitud: false }).populate("productoTemperatura").populate("productoHumedad").populate("usuario");
        res.json(colmenas);
    }
    catch (error) {
        res.status(500).send("Error en el servidor");
    }
}

const getColmena = async (req, res) => {
    try {
        const colmena = await colmenaModel.findById(req.params.id);

        if (!colmena) {
            res.status(404).json({ msg: "No existe la colmena" });
        }

        res.json(colmena);
    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
};

const crearColmena = async (req, res) => {
    try {
        const {
            nombre,
            ubicacion,

            produccion,
            productoTemperatura,
            productoHumedad,
            peso,
            observacion,


        } = req.body;

        const colmena = new colmenaModel({
            nombre,
            ubicacion,
            estado: true,
            produccion,
            productoTemperatura,
            productoHumedad,
            peso,
            observacion,
            usuario: req.usuario,
            solicitud: false
        });

        await colmena.save();

        res.json(colmena);
    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
};


const actualizarColmena = async (req, res) => {

    try {
        const {
            codigo,
            ubicacion,
            tipo,
            fecha,
            estado,
            produccion,
            temperatura,
            humedad,
            peso,
            observacion,
        } = req.body;

        let colmena = await colmenaModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                codigo,
                ubicacion,
                tipo,
                fecha,
                estado,
                produccion,
                temperatura,
                humedad,
                peso,
                observacion,
            },
            { new: true }
        );

        if (!colmena) {
            res.status(404).json({ msg: "No existe la colmena" });
        }

        res.json(colmena);


    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
}

const eliminarColmena = async (req, res) => {
    try {
        let colmena = await colmenaModel.findById(req.params.id);

        if (!colmena) {
            res.status(404).json({ msg: "No existe la colmena" });
        }

        await colmenaModel.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: "Colmena eliminada con exito" });

    } catch {
        res.status(500).send("Error en el servidor");
    }
}


const aceptarColmena = async (req, res) => {
    try {
        const colmena = await colmenaModel.findById(req.params.id);

        if (!colmena) {
            res.status(404).json({ msg: "No existe la colmena" });
        }

        colmena.solicitud = true;

        await colmena.save();

        res.json(colmena);

    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
}

const rechazarColmena = async (req, res) => {
    try {
        const colmena = await colmenaModel.findById(req.params.id);

        if (!colmena) {
            res.status(404).json({ msg: "No existe la colmena" });
        }

        await colmenaModel.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: "Colmena eliminada con exito" });

    } catch {
        res.status(500).send("Error en el servidor");
    }
}

const cambiarEstadoColmena = async (req, res) => {
    try {
        const colmena = await colmenaModel.findById(req.params.id);

        if (!colmena) {
            res.status(404).json({ msg: "No existe la colmena" });
        }

        colmena.estado = !colmena.estado;

        await colmena.save();

        res.json(colmena);

    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
}


module.exports = {
    getColmenas,
    getColmena,
    crearColmena,
    actualizarColmena,
    eliminarColmena,
    getMyColmenas,
    getColmenasSolicitud,
    aceptarColmena,
    rechazarColmena,
    cambiarEstadoColmena
};