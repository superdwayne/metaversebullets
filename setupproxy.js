const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();

app.use('/api/**', createProxyMiddleware({ target: 'https://metaversebullets.vercel.app/', changeOrigin: true }));
app.use('/bank/**', createProxyMiddleware({ target: 'https://metaversebullets.vercel.app/', changeOrigin: true }));
app.listen(5000);