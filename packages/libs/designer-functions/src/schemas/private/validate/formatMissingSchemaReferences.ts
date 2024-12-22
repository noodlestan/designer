import type { SchemaId } from '../../types';

export const formatMissingSchemaReferences = (
    missingReferences: [SchemaId, SchemaId[]][],
): string => {
    if (!missingReferences.length) {
        throw new Error(`No missing schema references to format.`);
    }
    return missingReferences
        .map(([missingRef, schemaIds]) => {
            return `Missing schema "${missingRef}", referenced in "${schemaIds.join(',')}".`;
        })
        .join(' ');
};
