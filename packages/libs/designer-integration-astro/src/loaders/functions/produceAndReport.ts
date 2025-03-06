import type { Store } from '@noodlestan/designer-decisions';
import {
    type BuilderContext,
    formatDecisionStatus,
    formatError,
    produceDecisions,
} from '@noodlestan/designer-functions';
import type { LoaderContext } from 'astro/loaders';

export async function produceAndReport(
    astroContext: LoaderContext,
    context: BuilderContext,
    build: () => Promise<Store>,
): Promise<Store> {
    const { logger } = astroContext;
    const store = await build();

    const produced = produceDecisions(context, store);
    produced
        .decisions()
        .filter(status => status.hasErrors)
        .forEach(status => logger.info(formatDecisionStatus(status)));

    context.errors()?.forEach(error => logger.error(formatError(error)));

    logger.info('🐘 ' + produced.summary());

    return store;
}
