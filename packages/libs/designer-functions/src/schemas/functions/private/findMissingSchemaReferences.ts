import { type BuilderContext, createBuilderSchemaError } from '../../../builder';
import type { SchemaId, SchemaMap } from '../../types';

export const findMissingSchemaReferences = (
    context: BuilderContext,
    schemaMap: SchemaMap,
    referencePairs: [SchemaId, SchemaId][],
): void => {
    const schemasWithMissingRefs: Record<SchemaId, SchemaId[]> = {};

    for (let i = 0; i < referencePairs.length; i++) {
        const [schemaId, reference] = referencePairs[i];
        if (schemaMap.has(reference)) continue;

        if (!schemasWithMissingRefs[schemaId]) {
            schemasWithMissingRefs[schemaId] = [];
        }
        schemasWithMissingRefs[schemaId].push(reference);
    }

    Object.entries(schemasWithMissingRefs).forEach(([schemaId, missingRefs]) => {
        const err = createBuilderSchemaError({
            id: schemaId,
            reason: `Missing references: [${missingRefs.join(',')}].`,
        });
        context.addError(err);
    });
};
