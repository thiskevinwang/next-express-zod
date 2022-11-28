import { OpenAPIGenerator } from '@asteasolutions/zod-to-openapi';
import * as fs from 'fs';

// import routes to ensure the registry instance
// registers paths properly
import '../pages/api/routes/api.route';
import '../pages/api/routes/docs.route';
import '../pages/api/routes/time.route';
import '../pages/api/routes/uuid.route';
import { registry } from './registry';

// RUN:
// node --loader ts-node/esm api-docs/index.ts && npx -p @redocly/cli redocly preview-docs
function main() {
  const generator = new OpenAPIGenerator(registry.definitions, '3.1.0');

  const document = generator.generateDocument({
    info: {
      version: '1.0.0',
      title: 'Express OpenAPI',
      description: 'Wow, 0 YAML written',
    },
    servers: [{ url: 'http://localhost:3000' }],
    tags: [
      {
        name: 'API',
        description: 'API routes',
      },
      {
        name: 'Docs',
        description: 'Open API Docs',
      },
      {
        name: 'Time',
        description: 'Time routes',
      },
      {
        name: 'UUID',
        description: 'Uuid routes',
      },
    ],
  });

  fs.writeFileSync('./pages/api/api-docs.json', JSON.stringify(document));
}

main();
