const express = require("express");
const cors = require("cors");
const conectarDB = require('../config/db');
const { createServer } = require("http");
const { socketController } = require("../sockets/controller");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = createServer(this.app);

        this.io = require("socket.io")(this.server, {
            cors: {
                origin: "*",
                allowedHeaders: ["my-custom-header"],
                credentials: true,
            },
        });

        this.paths = {

            usuario: "/api/usuarios",
            clientes: "/api/clientes",
            sucursales: "/api/sucursales",
            productos: "/api/productos",
            proveedores: "/api/proveedores",
            colmenas: "/api/colmenas",
            sensores: "/api/sensores",
            dashboard: "/api/dashboard"
        };

        this.middlewares();

        this.routes();

        this.socket();

        this.bd();

    }

    socket() {
        this.io.on("connection", (socket) => socketController(socket, this.io));
    }


    static get instance() {
        return this._intance || (this._intance = new this());
    }


    bd() {
        conectarDB();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        // this.app.use(cors());

        // Parseo y Lectura del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static("public"));

    }

    routes() {

        this.app.use(this.paths.usuario, require("../routes/UsuarioRoutes"));
        this.app.use(this.paths.clientes, require("../routes/ClienteRoutes"));
        this.app.use(this.paths.sucursales, require("../routes/SucursalRoutes"));
        this.app.use(this.paths.productos, require("../routes/ProductoRoutes"));
        this.app.use(this.paths.proveedores, require("../routes/ProveedorRoutes"));
        this.app.use(this.paths.colmenas, require("../routes/ColmenaRoutes"));
        this.app.use(this.paths.sensores, require("../routes/SensoresRoutes"));
        this.app.use(this.paths.dashboard, require("../routes/DashboardRoutes"));

    }


    listen() {
        this.server.listen(this.port, () => {
            console.log("puerto en lanzado en ", this.port);
        });
    }
}

module.exports = Server;
