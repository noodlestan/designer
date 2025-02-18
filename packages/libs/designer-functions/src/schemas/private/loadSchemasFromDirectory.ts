import fs from 'fs/promises';
import path from 'path';

import type { SchemaSource } from '@noodlestan/designer-decisions';

import { type StoreContext, createStoreSourceError, createUnexpectedError } from '../../store';
async function loadFromDirectory(
    context: StoreContext,
    dirPath: string,
    fileHandler: (filePath: string) => Promise<void>,
) {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stats = await fs.stat(fullPath);

        if (stats.isDirectory()) {
            await loadFromDirectory(context, fullPath, fileHandler);
        } else if (stats.isFile() && file.endsWith('.json')) {
            await fileHandler(fullPath);
        }
    }
}

export const loadSchemasFromDirectory = async (
    context: StoreContext,
    source: SchemaSource,
    dirPath: string,
    fileHandler: (filePath: string) => Promise<void>,
): Promise<void> => {
    try {
        const stats = await fs.stat(dirPath);
        if (!stats.isDirectory()) {
            const err = createStoreSourceError({
                type: 'SchemaSource',
                id: source.urnBase,
                source: source.source,
                path: dirPath,
                reason: 'Could not read directory.',
            });
            context.addError(err);
            return;
        }
    } catch (error) {
        const err = createStoreSourceError({
            type: 'SchemaSource',
            id: source.urnBase,
            source: source.source,
            path: dirPath,
            error,
            reason: 'Unexpected error reading directory.',
        });
        context.addError(err);
        return;
    }

    try {
        await loadFromDirectory(context, dirPath, fileHandler);
    } catch (error) {
        const err = createUnexpectedError({ error });
        context.addError(err);
    }
};
