import type { LoadedRecord } from '@noodlestan/designer-decisions';

import type { BuilderContext } from '../builder';
import { normalizeDecisionSource } from '../private';

import { loadDecisionsFromSource } from './functions';

export const loadDecisionsFromSources = async (
    context: BuilderContext,
): Promise<LoadedRecord[]> => {
    const { decisions: decisionSources } = context.options();

    const sources = decisionSources.map(normalizeDecisionSource);

    const recordsBySource = await Promise.all(
        sources.map(source => loadDecisionsFromSource(context, source)),
    );

    return recordsBySource.flat();
};
