import express = require("express");
import morgan = require("morgan");
import * as dotenv from "dotenv";
import proxy = require("express-http-proxy");
import { Signale } from 'signale';

const app: express.Application = express();
const signale = new Signale();

// Configura dotenv
dotenv.config();

// Utiliza morgan para logging
app.use(morgan('dev'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Definición de puertos y nombre de servicio
const PORT = process.env.PORT || 8000;
const GATEWAY = process.env.SERVICE_NAME;

// Ruta principal
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

// Ruta para manejar favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

// Rutas del proxy para users y musicians
app.use('/api/v1/users', proxy('http://web-server:3000'));
app.use('/api/v1/musicians', proxy('http://web-server:5000'));

// Middleware para manejar 404
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Inicia el servidor
app.listen(PORT, () => {
  signale.success('Servicio ${GATEWAY} corriendo en http://localhost:${PORT}');
});
