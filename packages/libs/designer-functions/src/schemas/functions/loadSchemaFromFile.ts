import fs from 'fs/promises';

import { type SchemaSource, maybeErrorMessage } from '@noodlestan/designer-decisions';

import { type BuilderContext, createBuilderSourceError } from '../../builder';
import { isNonEmptyString } from '../../private';
import type { SchemaData, SchemaMap } from '../types';

export const loadSchemaFromFile = async (
    context: BuilderContext,
    source: SchemaSource,
    schemas: SchemaMap,
    filePath: string,
): Promise<void> => {
    const attrs = {
        type: 'SchemaSource',
        id: source.urnBase,
        source: source.source,
        path: filePath,
    };

    let fileContents;
    let schemaData;

    try {
        fileContents = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}.');
        const err = createBuilderSourceError({
            ...attrs,
            reason: `Could not read schema file.${message}`,
        });
        context.addError(err);
        return;
    }

    try {
        schemaData = JSON.parse(fileContents) as SchemaData;
    } catch (error) {
        const message = maybeErrorMessage(error, ' {}.');
        const err = createBuilderSourceError({
            ...attrs,
            reason: `Could not parse schema file.${message}`,
        });
        context.addError(err);
        return;
    }

    if (!isNonEmptyString(schemaData.$id)) {
        const err = createBuilderSourceError({
            ...attrs,
            reason: 'Schema is missing a valid "$id" property.',
        });
        context.addError(err);
        return;
    }

    if (schemas.has(schemaData.$id)) {
        const err = createBuilderSourceError({
            ...attrs,
            reason: `Duplicate Schema $id "${schemaData.$id}".`,
        });
        context.addError(err);
        return;
    }

    schemas.set(schemaData.$id, schemaData);
};
