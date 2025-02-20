import glob from 'fast-glob';

import { type DeepPartial, normalizeDecisionSource } from '../private';
import { type StoreOptions, createStoreContext } from '../store';

import { resolveDecisionSourcePaths } from './functions';

const findDataFilesInPath = async (path: string): Promise<string[]> => {
    if (path.includes('node_modules')) {
        const g = glob(`${path}/**/*.json`);
        return g;
    }
    return [`${path}/**/*.json`];
};

export const resolveDecisionWatchPaths = async (
    options: DeepPartial<StoreOptions>,
): Promise<string[]> => {
    const context = createStoreContext(options as StoreOptions);

    const { decisions } = context.options();
    const normalized = decisions.map(normalizeDecisionSource);
    const paths = await resolveDecisionSourcePaths(context, normalized);

    const promises = paths.map(findDataFilesInPath);
    const resolvedPaths = await Promise.all(promises);
    return resolvedPaths.flat();
};
