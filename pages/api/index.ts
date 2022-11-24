import express from 'express';
import redoc from 'redoc-express';
import { v4 } from 'uuid';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';

const app = express();

// Server OpenAPI spec & Redoc UI
app.get('/api/docs/api-docs.json', (req, res) => {
  res.sendFile('api-docs.json', { root: './pages/api' });
});
app.get(
  '/api/docs',
  redoc({ title: 'API Docs', specUrl: '/api/docs/api-docs.json' }),
);

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello from express! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.get(
  '/api/validate/:key',
  validateRequest({
    params: z.object({
      key: z.string().length(5),
    }),
  }),
  (req, res) => {
    res.json(req.params);
  },
);

export default app;
