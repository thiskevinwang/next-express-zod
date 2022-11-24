import express from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';

import { docsRouter } from './docs.route';
import { timeRouter } from './time.route';
import { uuidRouter } from './uuid.route';

const apiRouter = express.Router();

apiRouter.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(
    `Hello from express! Checkout the api docs: <a href="/api/docs">/api/docs</a>`,
  );
});

apiRouter.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

apiRouter.get(
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

apiRouter.use(timeRouter);
apiRouter.use(uuidRouter);
apiRouter.use(docsRouter);

export { apiRouter };
