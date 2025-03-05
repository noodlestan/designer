import glob from 'fast-glob';

import { type BuilderOptions, createBuilderContext } from '../builder';
import { type DeepPartial, normalizeDecisionSource } from '../private';

import { resolveDecisionSourcePaths } from './functions';

const findDataFilesInPath = async (path: string): Promise<string[]> => {
    if (path.includes('node_modules')) {
        const g = glob(`${path}/**/*.json`);
        return g;
    }
    return [`${path}/**/*.json`];
};

export const resolveDecisionWatchPaths = async (
    options: DeepPartial<BuilderOptions>,
): Promise<string[]> => {
    const context = createBuilderContext(options as BuilderOptions);

    const { decisions } = context.options();
    const normalized = decisions.map(normalizeDecisionSource);
    const paths = await resolveDecisionSourcePaths(context, normalized);

    const promises = paths.map(findDataFilesInPath);
    const resolvedPaths = await Promise.all(promises);
    return resolvedPaths.flat();
};
