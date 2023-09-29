const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/Usuario');
const { validationResult } = require('express-validator');

const checkStatus = async (req, res, next) => {

    const { accessToken } = req.body;


    if (!accessToken) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición.'
        });
    }

    try {
        const { uid } = jwt.verify(accessToken, process.env.JWT_SECRET);

        console.log(uid);

        const usuario = await usuarioModel.findOne(
            { _id: uid }
        )

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido.'
            });
        }



        req.usuario = usuario;
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }
}

const validarJWT = async (req, res, next) => {


    const authorization = req.header('authorization');

    const token = authorization.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición.'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        console.log(uid);

        const usuario = await usuarioModel.findOne(
            { _id: uid }
        )




        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido.'
            });
        }



        req.usuario = usuario;
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }
}

const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errores.mapped()
        });
    }

    next();
}





module.exports = {
    validarJWT,
    validarCampos,
    checkStatus
}