import type { DecisionSource } from '@noodlestan/designer-decisions';

import { resolveDecisionSource } from './resolveDecisionSource';

export const resolveDecisionSourcePaths = async (
    sources: (DecisionSource | string)[],
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<string[]> => {
    return Promise.all(sources.map(source => resolveDecisionSource(source, moduleResolver)));
};
