import express from 'express';
import { z } from 'zod';

import { registry } from '../../../api-docs/registry';
import { UuidController } from '../controllers/uuid.controller';

export const uuidRouter = express.Router();
const uuidController = new UuidController();

uuidRouter.get('/api/uuid', uuidController.get());

registry.registerPath({
  method: 'get',
  path: '/api/uuid',
  description: 'Get random UUID/v4',
  summary: 'Get a random UUID/v4',
  tags: ['UUID'],
  request: {},
  responses: {
    200: {
      description: 'Random UUID/v4',
      content: {
        'application/json': {
          schema: z
            .object({
              uuid: z.string().uuid(),
            })
            .openapi({
              example: {
                uuid: '54d47b2d-9d60-47ff-ae30-d9808e718f03',
              },
            }),
        },
      },
    },
  },
});
