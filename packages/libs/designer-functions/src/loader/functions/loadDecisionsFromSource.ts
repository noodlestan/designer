import type { DecisionSource, InputRecord } from '@noodlestan/designer-decisions';

import { findJsonFiles } from './findJsonFiles';
import { loadDecisionFile } from './loadDecisionFile';
import { resolveDecisionSource } from './resolveDecisionSource';

export const loadDecisionsFromSource = async (
    source: DecisionSource,
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<InputRecord[]> => {
    const resolvedPath = await resolveDecisionSource(source, moduleResolver);
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
