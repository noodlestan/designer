import type { DecisionInputBase, DecisionSource } from '@noodlestan/designer-decisions';

import { loadDecisionsFromSource } from './loadDecisionsFromSource';

export const loadDecisionsFromSources = async (
    sources: (DecisionSource | string)[],
    moduleResolver: (moduleName: string) => Promise<string>,
): Promise<DecisionInputBase[]> => {
    const decisions = await Promise.all(
        sources.map(source => loadDecisionsFromSource(source, moduleResolver)),
    );

    return decisions.flat();
};
