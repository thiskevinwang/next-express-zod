import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { OpenAPIGenerator } from '@asteasolutions/zod-to-openapi';
import * as fs from 'fs';
import { z } from 'zod';

import { ContentSchema, DocsKeysSchema } from './components';
import { registry } from './registry';

extendZodWithOpenApi(z);

// RUN:
// node --loader ts-node/esm api-docs/index.ts && npx -p @redocly/cli redocly preview-docs
function main() {
  registry.registerPath({
    method: 'get',
    path: '/api/content/:product/:fullPath',
    description: 'Get a `nav-data`, `version-metadata`, or `doc` object',
    summary: 'Get a content object',
    tags: ['Content'],
    request: {
      query: z.object({
        partial: z.string().optional().openapi({ example: 'true' }),
      }),
      // Limitation: .openapi() must be called on individual fields in order to
      // generate parameter examples
      params: z.object({
        product: z.string().openapi({ example: 'waypoint' }),
        fullPath: z.string().openapi({ example: 'nav-data/v0.5.x/commands' }),
      }),
    },
    responses: {
      200: {
        description: 'A Content response',
        content: {
          'application/json': {
            schema: ContentSchema,
          },
        },
      },
      404: {
        description: 'Not found',
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/docs-keys/:product/:version',
    description:
      'List all docs keys for a given `product` and `version`. ' +
      'This is used to help facilitate pruning stale `doc` objects',
    summary: 'List all docs keys',
    tags: ['Docs Keys'],
    request: {
      // Limitation: .openapi() must be called on individual fields in order to
      // generate parameter examples
      params: z.object({
        product: z.string().openapi({ example: 'waypoint' }),
        version: z.string().openapi({ example: 'v0.5.x' }),
      }),
    },
    responses: {
      200: {
        description: 'A Docs Keys response',
        content: {
          'application/json': {
            schema: DocsKeysSchema,
          },
        },
      },
    },
  });

  const generator = new OpenAPIGenerator(registry.definitions, '3.1.0');

  // generator.generateComponents()
  const document = generator.generateDocument({
    info: {
      version: '1.0.0',
      title: 'MKTG Content Workflows',
      description: 'Wow, 0 YAML written',
    },
    servers: [{ url: 'https://content.hashicorp.com' }],
    tags: [
      { name: 'Content', description: 'Content endpoints' },
      {
        name: 'Assets',
        description: 'Assets endpoints',
      },
      {
        name: 'Docs Keys',
        description: 'Docs Keys endpoints',
      },
      {
        name: 'Static Paths',
        description: 'Static Paths endpoints',
      },
    ],
  });

  fs.writeFileSync('./pages/api/api-docs.json', JSON.stringify(document));
}

main();
