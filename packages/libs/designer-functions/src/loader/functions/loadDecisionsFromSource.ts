import type { DecisionInputBase, DecisionSource } from '@noodlestan/designer-decisions';

import { resolveSourcePath } from '../../helpers';

import { findJsonFiles } from './findJsonFiles';
import { loadDecisionFile } from './loadDecisionFile';

function resolveSource(sourceOrPath: string | DecisionSource): DecisionSource {
    if (typeof sourceOrPath === 'string') {
        return { name: sourceOrPath, source: { type: 'path', path: sourceOrPath } };
    }
    return sourceOrPath;
}

export const loadDecisionsFromSource = async (
    sourceOrPath: DecisionSource | string,
    moduleResolver: (moduleName: string) => Promise<string>,
): Promise<DecisionInputBase[]> => {
    const resolved = resolveSource(sourceOrPath);
    const resolvedPath = await resolveSourcePath(resolved.source, moduleResolver);
    const files = await findJsonFiles(resolvedPath);
    const allFiles = files.flat();

    const decisions = await Promise.all(
        allFiles.map(filePath =>
            loadDecisionFile(filePath).catch(error => {
                const message = error instanceof Error ? error.message : String(error);
                console.error(`Error processing file "${filePath}": ${message}.`);
                return [];
            }),
        ),
    );

    return decisions.flat();
};
