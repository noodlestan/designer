import type { DecisionSource, InputRecord } from '@noodlestan/designer-decisions';

import { loadDecisionsFromSource } from './loadDecisionsFromSource';

export const loadDecisionsFromSources = async (
    sources: DecisionSource[],
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<InputRecord[]> => {
    const decisions = await Promise.all(
        sources.map(source => loadDecisionsFromSource(source, moduleResolver)),
    );

    return decisions.flat();
};
