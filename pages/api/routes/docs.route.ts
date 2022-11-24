import express from 'express';
import redoc from 'redoc-express';
import { z } from 'zod';

import { registry } from '../../../api-docs/registry';

export const docsRouter = express.Router();

// Server OpenAPI spec & Redoc UI
docsRouter.get('/api/docs/api-docs.json', (req, res) => {
  res.sendFile('api-docs.json', { root: './pages/api' });
});
docsRouter.get(
  '/api/docs',
  redoc({ title: 'API Docs', specUrl: '/api/docs/api-docs.json' }),
);

// Optionally register API docs
registry.registerPath({
  method: 'get',
  path: '/api/docs',
  description: 'View OpenAPI docs',
  summary: 'View OpenAPI docs',
  tags: ['Docs'],
  request: {},
  responses: {
    200: {
      description: 'Open API docs UI',
      content: {
        'text/html; charset=utf-8': {
          schema: z.string(),
        },
      },
    },
  },
});
