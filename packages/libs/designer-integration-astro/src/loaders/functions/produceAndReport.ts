import {
    type Store,
    formatDecisionStatus,
    formatError,
    produceDecisions,
} from '@noodlestan/designer-functions';
import type { LoaderContext } from 'astro/loaders';

export async function produceAndReport(
    context: LoaderContext,
    build: () => Promise<Store>,
): Promise<Store> {
    const { logger } = context;
    const store = await build();

    const produced = produceDecisions(context, store);
    produced
        .decisions()
        .filter(status => status.hasErrors)
        .forEach(status => logger.info(formatDecisionStatus(status)));

    store
        .context()
        .errors()
        ?.forEach(error => logger.error(formatError(error)));

    logger.info('🐘 ' + produced.summary());

    return store;
}
