import { type Handler } from 'express';
import { v4 } from 'uuid';
import { z } from 'zod';

import { registry } from '../../../api-docs/registry';

export class UuidController {
  static schemas = {
    random: z.object({
      uuid: z.string().uuid(),
    }),
  };

  static openAPIComponents = {
    random: registry.register(
      'UuidRandom',
      UuidController.schemas.random.openapi({
        example: {
          uuid: '54d47b2d-9d60-47ff-ae30-d9808e718f03',
        },
      }),
    ),
  };

  constructor() {}

  private random(): z.infer<typeof UuidController.schemas.random> {
    return { uuid: v4() };
  }

  get: () => Handler = () => (req, res) => {
    res.json(this.random());
  };
}
