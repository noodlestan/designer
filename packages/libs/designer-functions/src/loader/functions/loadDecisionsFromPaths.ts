import type { DecisionInputBase } from '@noodlestan/designer-decisions';

import { findJsonFiles } from './findJsonFiles';
import { loadDecisionFile } from './loadDecisionFile';

export const loadDecisionsFromPaths = async (dataPaths: string[]): Promise<DecisionInputBase[]> => {
    const files = await Promise.all(dataPaths.map(findJsonFiles));
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
