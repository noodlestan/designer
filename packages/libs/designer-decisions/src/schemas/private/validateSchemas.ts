import type { SchemaMap } from '../types';

import {
    extractSchemasReferencePairs,
    findMissingSchemaReferences,
    formatMissingSchemaReferences,
} from './validate';

export const validateSchemas = (schemas: SchemaMap): void => {
    const referencePairs = extractSchemasReferencePairs(schemas);
    const missingReferences = findMissingSchemaReferences(schemas, referencePairs);

    if (missingReferences.length > 0) {
        const message = formatMissingSchemaReferences(missingReferences);
        throw new Error(
            `Error loading schemas. One or more references could not be resolved. ${message}`,
        );
    }
};
