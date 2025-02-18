import type { LoadedRecord } from '@noodlestan/designer-decisions';

import type { StoreContext } from '../store';

import { loadDecisionsFromSource, normalizeSource } from './functions';

export const loadDecisionsFromSources = async (context: StoreContext): Promise<LoadedRecord[]> => {
    const { decisions: decisionSources } = context.options();

    const sources = decisionSources.map(normalizeSource);

    const recordsBySource = await Promise.all(
        sources.map(source => loadDecisionsFromSource(context, source)),
    );

    return recordsBySource.flat();
};
