import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const framework = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/framework' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

// Future collections added per-milestone:
// M2: tutorials, community (catalog items)
// M3: failure-modes
// M4: workshops

export const collections = { framework };
