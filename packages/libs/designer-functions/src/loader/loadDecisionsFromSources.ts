import type { LoadedRecord } from '@noodlestan/designer-decisions';

import { normalizeDecisionSource } from '../private';
import type { StoreContext } from '../store';

import { loadDecisionsFromSource } from './functions';

export const loadDecisionsFromSources = async (context: StoreContext): Promise<LoadedRecord[]> => {
    const { decisions: decisionSources } = context.options();

    const sources = decisionSources.map(normalizeDecisionSource);

    const recordsBySource = await Promise.all(
        sources.map(source => loadDecisionsFromSource(context, source)),
    );

    return recordsBySource.flat();
};
