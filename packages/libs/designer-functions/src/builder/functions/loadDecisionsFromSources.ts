import type { InputRecord } from '@noodlestan/designer-decisions';

import type { StoreContext } from '../../store';

import { loadDecisionsFromSource } from './loadDecisionsFromSource';
import { normalizeSource } from './normalizeSource';

export const loadDecisionsFromSources = async (context: StoreContext): Promise<InputRecord[]> => {
    const { decisions: decisionSources } = context.options();

    const sources = decisionSources.map(normalizeSource);

    const decisions = await Promise.all(
        sources.map(source => loadDecisionsFromSource(context, source)),
    );

    return decisions.flat();
};
