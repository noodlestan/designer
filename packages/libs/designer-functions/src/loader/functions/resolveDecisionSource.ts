import type { DecisionSource } from '@noodlestan/designer-decisions';

import { resolveSourcePath } from '../../helpers';

import { resolveSource } from './resolveSource';

export const resolveDecisionSource = async (
    source: DecisionSource,
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<string> => {
    const resolved = resolveSource(source);
    const resolvedPath = await resolveSourcePath(resolved.source, moduleResolver);

    return resolvedPath;
};
