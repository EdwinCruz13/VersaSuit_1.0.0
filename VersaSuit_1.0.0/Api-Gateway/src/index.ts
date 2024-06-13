import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

// Configurar rutas de proxy
app.use('/api/v1/settings/companies', createProxyMiddleware({ target: 'http://localhost:4003', pathRewrite: {'^/api/v1/settings/companies': ''}, changeOrigin: true }));



app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});