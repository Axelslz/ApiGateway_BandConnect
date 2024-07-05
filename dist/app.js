"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const signale_1 = require("signale");
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
// Configuración de dotenv para cargar variables de entorno
dotenv_1.default.config();
// Middleware para logs de HTTP con Morgan
app.use((0, morgan_1.default)('dev'));
// Configuración de puertos y nombre del servicio
const PORT = process.env.PORT || 8000;
const GATEWAY = process.env.SERVICE_NAME;
// Configuración de proxy para usuarios y músicos
app.use('/api/v1/users', (0, express_http_proxy_1.default)('http://localhost:3000'));
app.use('/api/v1/musicians', (0, express_http_proxy_1.default)('http://localhost:5000'));
// Rutas de autenticación (deberías agregar aquí las rutas específicas de auth)
// Iniciar el servidor
app.listen(PORT, () => {
    signale.success(`Servicio ${GATEWAY} corriendo en http://localhost:${PORT}`);
});
