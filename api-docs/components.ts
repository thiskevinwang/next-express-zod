import { z } from 'zod';

import { DocsKey, Meta, NavData } from './application_schemas';
import { registry } from './registry';

// Register OpenAPI components
export const MetaSchema = registry.register(
  'Meta',
  Meta.openapi({
    example: {
      status_code: 200,
      status_text: 'OK',
    },
  }),
);

export const NavDataSchema = registry.register(
  'NavData',
  NavData.openapi({
    example: {
      product: 'waypoint',
      githubFile: 'website/content/commands-nav-data.json',
      version: 'v0.5.x',
      created_at: '2022-03-22T15:06:56.255Z',
      sha: '32505cee8d4714d9b801028823ad566bb96258e4',
      sk: 'nav-data/v0.5.x/commands',
      subpath: 'commands',
      pk: 'waypoint#nav-data/v0.5.x/commands',
      navData: [
        {
          title: 'build',
          path: 'v0.5.x/build',
        },
      ],
    },
  }),
);

export const ContentSchema = registry.register(
  'Content',
  z.object({
    meta: MetaSchema,
    result: NavDataSchema,
  }),
);

export const DocsKeysSchema = registry.register(
  'DocsKeys',
  z.object({
    meta: MetaSchema,
    result: DocsKey.array().openapi({
      example: [
        {
          pk: 'waypoint#doc/v0.5.x/commands/server-restore',
          sk: 'doc#commands/server-restore',
        },
      ],
    }),
  }),
);
