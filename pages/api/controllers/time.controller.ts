import { type Handler } from 'express';
import { z } from 'zod';

import { registry } from '../../../api-docs/registry';

export class TimeController {
  static schemas = {
    now: z.object({
      time: z.number(),
    }),
  };

  static openAPIComponents = {
    now: registry.register(
      'TimeNow',
      TimeController.schemas.now.openapi({
        example: {
          time: 1669307841493,
        },
      }),
    ),
  };

  constructor() {}

  private now(): z.infer<typeof TimeController.schemas.now> {
    return {
      time: new Date().getTime(),
    };
  }

  get: () => Handler = () => (req, res) => {
    res.json(this.now());
  };
}
