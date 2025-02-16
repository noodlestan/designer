import {
    type StaticStore,
    formatDecisionStatus,
    formatStoreError,
    produceDecisions,
} from '@noodlestan/designer-functions';
import type { LoaderContext } from 'astro/loaders';

export async function produceAndReport(
    context: LoaderContext,
    loader: () => Promise<StaticStore>,
): Promise<StaticStore> {
    const { logger } = context;
    const store = await loader();

    const produced = produceDecisions(store);
    produced
        .decisions()
        .filter(status => status.hasErrors)
        .forEach(status => logger.info(formatDecisionStatus(status)));

    if (store.hasErrors()) {
        store.storeErrors()?.forEach(error => logger.error(formatStoreError(error)));
    }

    logger.info('🐘 ' + produced.summary());

    return store;
}
