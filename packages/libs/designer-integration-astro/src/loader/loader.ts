import path from 'node:path';

import { DEMO_DATA, SAMPLE_DATA } from '@noodlestan/designer-decisions';
import {
    type StaticDecisionStore,
    createDecisionLoader,
    formatDecisionStatus,
    formatStoreError,
    formatValidationError,
    loadConfig,
    produceDecisions,
    resolveDecisionSourcePaths,
} from '@noodlestan/designer-functions';
import type { Loader, LoaderContext } from 'astro/loaders';

const LOCAL_DATA = path.resolve('./data');

export async function decisionLoader(): Promise<StaticDecisionStore> {
    const config = await loadConfig();
    const loader = createDecisionLoader(config.loader);
    return loader();
}

export function collectionLoader(): Loader {
    return {
        name: '@noodlestan/designer-integrations-astro/loader',
        load: async (context: LoaderContext): Promise<void> => {
            let count = 0;
            const { logger, watcher, store: contentStore } = context;
            const store = await decisionLoader();
            if (store.hasErrors()) {
                store.storeErrors()?.forEach(error => console.error(formatStoreError(error)));
                store
                    .validationErrors()
                    ?.forEach(error => console.error(formatValidationError(error)));
            }

            const produced = produceDecisions(store);
            produced
                .decisions()
                // .filter(status => status.hasErrors)
                .forEach(status => console.info(formatDecisionStatus(status)));

            logger.info('🐘 ' + produced.summary());

            const paths = await resolveDecisionSourcePaths([SAMPLE_DATA, DEMO_DATA, LOCAL_DATA]);

            paths.forEach(path => {
                const watch = `${path}/**/*.json`;
                logger.info(watch);
                watcher?.add(watch);
            });

            watcher?.on('change', updated => {
                if (updated.endsWith('.json') && !updated.includes('.astro')) {
                    contentStore.set({
                        id: '1',
                        data: { count: count++ },
                    });
                    logger.info('Updated:' + updated);
                }
            });
        },
    };
}
