import type { SchemaSource } from '@noodlestan/designer-decisions';

import { resolveSourcePath } from '../helpers';
import { maybeErrorMessage } from '../private';
import { type StoreContext, createStoreSourceError } from '../store';

import { loadSchemaFromFile, loadSchemasFromDirectory } from './private';
import type { SchemaMap } from './types';

export const loadSchemasFromSource = async (
    context: StoreContext,
    schemas: SchemaMap,
    schemaSource: SchemaSource,
): Promise<void> => {
    const { resolver: moduleResolver } = context.options();

    let path;
    try {
        path = await resolveSourcePath(schemaSource.source, moduleResolver);
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}');
        const err = createStoreSourceError({
            type: 'SchemaSource',
            id: schemaSource.urnBase,
            source: schemaSource.source,
            reason: `Could not resolve path. ${message}.`,
        });
        context.addError(err);
        return undefined;
    }

    await loadSchemasFromDirectory(context, schemaSource, path, filePath =>
        loadSchemaFromFile(context, schemaSource, schemas, filePath),
    );
};
