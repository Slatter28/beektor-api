const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '365d',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}

const comprobarJWT = async (token = '') => {
    try {
        if (token.length < 10) {
            return null;
        }
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(uid);
        if (usuario) {
            if (usuario.estado) {
                return usuario;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
const comprobarJWTSocket = (token = '') => {

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        return [true, uid];

    } catch (error) {
        return [false, null];
    }

}


module.exports = {
    generarJWT,
    comprobarJWT,
    comprobarJWTSocket
}