import { defineCollection, z } from 'astro:content';

import { collectionLoader } from '../loader';

export const collections = {
    decisions: defineCollection({
        loader: collectionLoader(),
        schema: z.object({ count: z.number() }),
    }),
};
