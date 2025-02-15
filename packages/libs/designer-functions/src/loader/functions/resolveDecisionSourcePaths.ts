import type { DecisionSource } from '@noodlestan/designer-decisions';

import { resolveDecisionSource } from './resolveDecisionSource';

export const resolveDecisionSourcePaths = async (
    sources: DecisionSource[],
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<string[]> => {
    return Promise.all(
        sources
            .filter(({ source }) => source.type === 'package' || source.type === 'path')
            .map(source => resolveDecisionSource(source, moduleResolver)),
    );
};
