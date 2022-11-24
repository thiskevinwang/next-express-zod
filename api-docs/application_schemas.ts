import { z } from 'zod';

// This file simulates zod objects that would
// be defined elsewhere, alongside application code
export const Meta = z.object({
  status_code: z.number(),
  status_text: z.string(),
});

export const NavData = z.object({
  product: z.string(),
  githubFile: z.string(),
  version: z.string(),
  created_at: z.string(),
  sha: z.string(),
  sk: z.string(),
  subpath: z.string(),
  pk: z.string(),
  navData: z.object({ title: z.string(), path: z.string() }).array(),
});

export const DocsKey = z.object({
  pk: z.string(),
  sk: z.string(),
});
