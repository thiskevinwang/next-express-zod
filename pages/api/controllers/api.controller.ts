import { type Handler } from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';

import { registry } from '../../../api-docs/registry';

export class ApiController {
  static schemas = {
    welcome: z.string(),
    validateRequest: z.object({
      key: z.string().length(5),
    }),
    slugRequest: z.object({
      slug: z.string(),
    }),
  };

  static openAPIComponents = {
    now: registry.register(
      'ApiWelcome',
      ApiController.schemas.welcome.openapi({
        example: 'Welcome',
      }),
    ),
    badRequest: registry.register(
      'BadRequest',
      z
        .unknown()
        .array()
        .openapi({
          example: [
            {
              type: 'Params',
              errors: {
                issues: [
                  {
                    code: 'too_small',
                    minimum: 5,
                    type: 'string',
                    inclusive: true,
                    message: 'String must contain at least 5 character(s)',
                    path: ['key'],
                  },
                ],
                name: 'ZodError',
              },
            },
          ],
        }),
    ),
  };
  static openAPIParameters = {
    slugRequest: registry.registerParameter(
      'ApiSlugRequest',
      ApiController.schemas.slugRequest.openapi({
        param: {
          in: 'path',
          name: 'slug',
        },
        example: {
          slug: 'foobar',
        },
      }),
    ),
    validateRequest: registry.registerParameter(
      'ApiValidateRequest',
      ApiController.schemas.validateRequest.openapi({
        param: {
          in: 'path',
          name: 'key',
        },
        example: {
          key: 'five_',
        },
      }),
    ),
  };

  constructor() {}

  private welcome(): z.infer<typeof ApiController.schemas.welcome> {
    return `Hello from express! Checkout the api docs: <a href="/api/docs">/api/docs</a>`;
  }

  get: () => Handler = () => (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(this.welcome());
  };

  getSlug: () => Handler = () => (req, res) => {
    const { slug } = req.params;
    res.json({ slug: slug });
  };
}
