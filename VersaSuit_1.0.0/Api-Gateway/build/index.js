"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const app = (0, express_1.default)();
// Configurar rutas de proxy
app.use('/auth', (0, http_proxy_middleware_1.createProxyMiddleware)({ target: 'http://billing-service:4000', changeOrigin: true }));
app.use('/users', (0, http_proxy_middleware_1.createProxyMiddleware)({ target: 'http://users-service:4002', changeOrigin: true }));
app.use('/settings', (0, http_proxy_middleware_1.createProxyMiddleware)({ target: 'http://inventory-service:4003', changeOrigin: true }));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
