import express from 'express';
import { z } from 'zod';
import { validateRequestParams } from 'zod-express-middleware';
import 'zod-express-middleware/lib/index';

import { registry } from '../../../api-docs/registry';
import { ApiController } from '../controllers/api.controller';
import { docsRouter } from './docs.route';
import { timeRouter } from './time.route';
import { uuidRouter } from './uuid.route';

export const apiRouter = express.Router();
const apiController = new ApiController();

apiRouter.get('/api', apiController.get());

apiRouter.get(
  '/api/item/:slug',
  validateRequestParams(ApiController.openAPIParameters.slugRequest),
  apiController.getSlug(),
);

apiRouter.get(
  '/api/validate/:key',
  validateRequestParams(ApiController.openAPIParameters.validateRequest),
  (req, res) => {
    res.json(req.params);
  },
);

registry.registerPath({
  method: 'get',
  path: '/api/item/:slug',
  description:
    'A route with path parameter validation. The `:slug` path param must be a string',
  summary: 'A route with path parameter validation',
  tags: ['API'],
  request: {
    params: ApiController.openAPIParameters.slugRequest,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: ApiController.schemas.slugRequest,
        },
      },
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: ApiController.openAPIComponents.badRequest,
        },
      },
    },
  },
});
registry.registerPath({
  method: 'get',
  path: '/api/validate/:key',
  description:
    'A route with path parameter validation. The `:key` path param must be 5 characters long',
  summary: 'A route with path parameter validation',
  tags: ['API'],
  request: {
    params: ApiController.openAPIParameters.validateRequest,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({
            key: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: ApiController.openAPIComponents.badRequest,
        },
      },
    },
  },
});

apiRouter.use(timeRouter);
apiRouter.use(uuidRouter);
apiRouter.use(docsRouter);
