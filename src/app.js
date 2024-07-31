"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var dotenv = require("dotenv");
var proxy = require("express-http-proxy");
var signale_1 = require("signale");
var app = express();
var signale = new signale_1.Signale();
// Configura dotenv
dotenv.config();
// Utiliza morgan para logging
app.use(morgan('dev'));
// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
// Definición de puertos y nombre de servicio
var PORT = process.env.PORT || 8000;
var GATEWAY = process.env.SERVICE_NAME;
// Ruta principal
app.get('/', function (req, res) {
    res.send('API Gateway is running');
});
// Ruta para manejar favicon.ico
app.get('/favicon.ico', function (req, res) { return res.status(204); });
// Rutas del proxy para users y musicians
app.use('/api/v1/users', proxy('http://localhost:3000'));
app.use('/api/v1/musicians', proxy('http://localhost:5000'));
// Middleware para manejar 404
app.use(function (req, res, next) {
    res.status(404).send('Not Found');
});
// Inicia el servidor
app.listen(PORT, function () {
    signale.success("Servicio ".concat(GATEWAY, " corriendo en http://localhost:").concat(PORT));
});
