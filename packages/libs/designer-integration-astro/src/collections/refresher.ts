import { defineCollection, z } from 'astro:content';

import { refresherCollectionLoader } from '../loaders';
import { DESIGNER_INTEGRATION_REFRESHER } from '../private';

/**
 * This fake collection exists so that we can trigger an update
 * on Astro's content layer. See refresherCollectionLoader() for more info.
 */
export const collections = {
    [DESIGNER_INTEGRATION_REFRESHER]: defineCollection({
        loader: refresherCollectionLoader(),
        schema: z.object({ count: z.number() }),
    }),
};
