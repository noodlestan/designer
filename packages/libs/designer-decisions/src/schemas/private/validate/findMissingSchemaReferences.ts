import { SchemaId, SchemaMap } from '../../types';

export const findMissingSchemaReferences = (
    schemas: SchemaMap,
    referencePairs: [SchemaId, SchemaId][],
): [SchemaId, SchemaId[]][] => {
    const missingReferences: Record<SchemaId, SchemaId[]> = {};

    for (let i = 0; i < referencePairs.length; i++) {
        const [schemaId, reference] = referencePairs[i];
        if (schemas.has(reference)) continue;

        if (!missingReferences[reference]) {
            missingReferences[reference] = [];
        }
        missingReferences[reference].push(schemaId);
    }

    return Object.entries(missingReferences) as [SchemaId, SchemaId[]][];
};
