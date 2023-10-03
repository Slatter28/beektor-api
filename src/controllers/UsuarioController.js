const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/JWT');
const jwt = require('jsonwebtoken');


const crearUsuario = async (req, res) => {

    try {
        const { usuario, correo, contrasena, rol } = req.body;
        let findUsuario = await Usuario.findOne({ correo });

        if (findUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado.'
            });
        }

        const newUsuario = new Usuario({
            usuario,
            correo,
            contrasena,
            rol: rol || 'USER_ROLE'
        });

        const salt = bcrypt.genSaltSync();
        newUsuario.contrasena = bcrypt.hashSync(contrasena, salt);

        await newUsuario.save();

        const token = await generarJWT(newUsuario.id);

        res.status(201).json({
            ok: true,
            usuario: newUsuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.'
        });
    }

}


const loginUsuario = async (req, res) => {

    const { correo, contrasena } = req.body;

    console.log(correo, contrasena);

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe.'
            });
        }

        const validPassword = bcrypt.compareSync(contrasena, usuario.contrasena);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida.'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            uid: usuario.id,
            usuario: usuario,
            accessToken: token
        });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.'
        });
    }

}


const revalidarToken = async (req, res) => {

    const { uid } = req;

    const usuario = await Usuario.findById(uid);

    const token = await generarJWT(uid);

    res.json({
        ok: true,
        uid,
        usuario,
        token
    });

}
const renewToken = async (req, res) => {

    const { uid } = req;

    const usuario = await Usuario.findById(uid);

    const token = await generarJWT(uid);

    res.json({
        ok: true,
        uid,
        user: usuario,
        accessToken: token
    });

}


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios
    });

}


const hacerAdmin = async (req, res) => {

    const { uid } = req.params;

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario con ese id.'
        });
    }

    usuario.rol = 'ADMIN_ROLE';

    await usuario.save();

    res.json({
        ok: true,
        usuario
    });

}


const hacerUser = async (req, res) => {

    const { uid } = req.params;

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario con ese id.'
        });
    }

    usuario.rol = 'USER_ROLE';

    await usuario.save();

    res.json({
        ok: true,
        usuario
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    renewToken,
    getUsuarios,
    hacerAdmin,
    hacerUser
}




