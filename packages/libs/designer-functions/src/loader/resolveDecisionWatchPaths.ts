import type { DecisionSource } from '@noodlestan/designer-decisions';
import glob from 'fast-glob';

import { normalizeSources, resolveDecisionSourcePaths } from './functions';

const findDataFilesInPath = async (path: string): Promise<string[]> => {
    if (path.includes('node_modules')) {
        const g = glob(`${path}/**/*.json`);
        return g;
    }
    return [`${path}/**/*.json`];
};

export const resolveDecisionWatchPaths = async (
    decisionSources: (string | DecisionSource)[],
): Promise<string[]> => {
    const normalized = normalizeSources(decisionSources);
    const paths = await resolveDecisionSourcePaths(normalized);
    const promises = paths.map(findDataFilesInPath);
    const resolvedPaths = await Promise.all(promises);
    return resolvedPaths.flat();
};
