import express from 'express';
import { z } from 'zod';

import { registry } from '../../../api-docs/registry';
import { TimeController } from '../controllers/time.controller';

export const timeRouter = express.Router();
const timeController = new TimeController();

timeRouter.get('/api/time', timeController.get());

registry.registerPath({
  method: 'get',
  path: '/api/time',
  description: 'Get current timestamp',
  summary: 'Get the current timestamp',
  tags: ['Time'],
  request: {},
  responses: {
    200: {
      description: 'Current Timestamp',
      content: {
        'application/json': {
          schema: TimeController.openAPIComponents.now,
        },
      },
    },
  },
});
