import type { Loader, LoaderContext } from 'astro/loaders';

import { DESIGNER_INTEGRATION_LOADER } from '../private';

import { watchDecisionSources } from './functions';

/**
 * This fake collection exists so that we can trigger an update
 * on Astro's content layer.
 *
 * This was the best (only) way we could find
 * to have access to the underlying file watcher.
 *
 * See watchDecisionSources() for more info.
 */
export function refresherCollectionLoader(): Loader {
    return {
        name: DESIGNER_INTEGRATION_LOADER,
        load: (context: LoaderContext) => watchDecisionSources(context),
    };
}
