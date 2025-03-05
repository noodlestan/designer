import { type SchemaSource, maybeErrorMessage } from '@noodlestan/designer-decisions';

import { type BuilderContext, createBuilderSourceError } from '../../builder';
import { resolveSourcePath } from '../../helpers';
import type { SchemaMap } from '../types';

import { loadSchemaFromFile } from './loadSchemaFromFile';
import { loadSchemasFromDirectory } from './loadSchemasFromDirectory';

export const loadSchemasFromSource = async (
    context: BuilderContext,
    schemas: SchemaMap,
    schemaSource: SchemaSource,
): Promise<void> => {
    const { resolver: moduleResolver } = context.options();

    let path;
    try {
        path = await resolveSourcePath(schemaSource.source, moduleResolver);
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}');
        const err = createBuilderSourceError({
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
