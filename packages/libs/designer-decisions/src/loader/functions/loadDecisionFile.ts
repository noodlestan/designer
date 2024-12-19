import fs from 'fs/promises';

import { DecisionInput } from '../../types';

export async function loadDecisionFile(filePath: string): Promise<DecisionInput[]> {
    const content = await fs.readFile(filePath, 'utf-8');
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to parse JSON decision file "${filePath}": ${message}.`);
    }
    if (!Array.isArray(parsed)) {
        throw new Error(`Decision file does not contain an array: "${filePath}".`);
    }
    return parsed as DecisionInput[];
}
