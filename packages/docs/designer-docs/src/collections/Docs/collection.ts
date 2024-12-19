import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';

export const DocsCollection = defineCollection({ schema: docsSchema() });
