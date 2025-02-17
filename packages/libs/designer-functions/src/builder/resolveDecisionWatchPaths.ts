import glob from 'fast-glob';

import { type StoreOptions, createStoreContext } from '../store';

import { normalizeSource, resolveDecisionSourcePaths } from './functions';

const findDataFilesInPath = async (path: string): Promise<string[]> => {
    if (path.includes('node_modules')) {
        const g = glob(`${path}/**/*.json`);
        return g;
    }
    return [`${path}/**/*.json`];
};

export const resolveDecisionWatchPaths = async (options: StoreOptions): Promise<string[]> => {
    const context = createStoreContext(options);

    const { decisions } = context.options();
    const normalized = decisions.map(normalizeSource);
    const paths = await resolveDecisionSourcePaths(context, normalized);

    const promises = paths.map(findDataFilesInPath);
    const resolvedPaths = await Promise.all(promises);
    return resolvedPaths.flat();
};
