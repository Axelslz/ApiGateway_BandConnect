// Importa todo el módulo como un solo objeto y luego desestructura según sea necesario
import express = require("express");
import morgan = require("morgan");
import * as dotenv from "dotenv";
import proxy = require("express-http-proxy");

// La clase Signale se puede seguir importando de la misma manera porque es una exportación nombrada
import { Signale } from "signale";

const app: express.Application = express();
const signale = new Signale();

// Configura dotenv
dotenv.config();

// Utiliza morgan para logging
app.use(morgan('dev'));

// Definición de puertos y nombre de servicio
const PORT = process.env.PORT || 8000;
const GATEWAY = process.env.SERVICE_NAME;

// Rutas del proxy para users y musicians
app.use('/api/v1/users', proxy('http://localhost:3000'));
app.use('/api/v1/musicians', proxy('http://localhost:5000'));

// Rutas de autenticación pendientes de agregar

// Inicia el servidor
app.listen(PORT, () => {
    signale.success(`Servicio ${GATEWAY} corriendo en http://localhost:${PORT}`);
});

