import fs from 'fs/promises';
import path from 'path';

import type { DecisionSource } from '@noodlestan/designer-decisions';

import { type StoreContext, createStoreSourceError } from '../../store';

export async function findJsonFiles(
    context: StoreContext,
    source: DecisionSource,
    dirPath: string,
): Promise<string[]> {
    const attrs = {
        type: 'DecisionSource',
        id: source.name,
        source: source.source,
        path: dirPath,
    };

    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });

        const promises = entries.map(entry => {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                return findJsonFiles(context, source, fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.json')) {
                return [fullPath];
            }
            return [];
        });
        const files = await Promise.all(promises);
        return files.flat();
    } catch (error) {
        const err = createStoreSourceError({
            ...attrs,
            reason: 'Could not read schema File.',
            error,
        });
        context.addError(err);
        return [];
    }
}
