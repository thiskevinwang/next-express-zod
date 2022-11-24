import express from 'express';
import redoc from 'redoc-express';

export const docsRouter = express.Router();

// Server OpenAPI spec & Redoc UI
docsRouter.get('/api-docs.json', (req, res) => {
  res.sendFile('api-docs.json', { root: './pages/api' });
});
docsRouter.get(
  '/',
  redoc({ title: 'API Docs', specUrl: '/api/docs/api-docs.json' }),
);
