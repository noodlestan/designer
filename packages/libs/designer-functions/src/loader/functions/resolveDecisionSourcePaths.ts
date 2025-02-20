import type { DecisionSource } from '@noodlestan/designer-decisions';

import { resolveSourcePath } from '../../helpers';
import { normalizeDecisionSource } from '../../private/normalizeDecisionSource';
import type { StoreContext } from '../../store';

const isFileSystemSource = ({ source }: DecisionSource) => {
    return source.type === 'package' || source.type === 'path';
};

export const resolveDecisionSourcePaths = async (
    context: StoreContext,
    sources: DecisionSource[],
): Promise<string[]> => {
    const { resolver } = context.options();
    const maybePaths = await Promise.all(
        sources
            .map(normalizeDecisionSource)
            .filter(isFileSystemSource)
            .map(source => {
                try {
                    return resolveSourcePath(source.source, resolver);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    return undefined;
                }
            }),
    );
    return maybePaths.filter(Boolean) as string[];
};
