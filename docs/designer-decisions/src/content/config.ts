import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';

const DocsCollection = defineCollection({ schema: docsSchema() });

export const collections = {
    docs: DocsCollection,
};
