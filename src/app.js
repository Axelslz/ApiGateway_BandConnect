"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importa todo el módulo como un solo objeto y luego desestructura según sea necesario
var express = require("express");
var morgan = require("morgan");
var dotenv = require("dotenv");
var proxy = require("express-http-proxy");
// La clase Signale se puede seguir importando de la misma manera porque es una exportación nombrada
var signale_1 = require("signale");
var app = express();
var signale = new signale_1.Signale();
// Configura dotenv
dotenv.config();
// Utiliza morgan para logging
app.use(morgan('dev'));
// Definición de puertos y nombre de servicio
var PORT = process.env.PORT || 8000;
var GATEWAY = process.env.SERVICE_NAME;
// Rutas del proxy para users y musicians
app.use('/api/v1/users', proxy('http://localhost:3000'));
app.use('/api/v1/musicians', proxy('http://localhost:5000'));
// Rutas de autenticación pendientes de agregar
// Inicia el servidor
app.listen(PORT, function () {
    signale.success("Servicio ".concat(GATEWAY, " corriendo en http://localhost:").concat(PORT));
});
