import type { DataSource, NestedSchemaSource, SchemaSource } from '@noodlestan/designer-decisions';

import { type StoreContext, createStoreSourceError } from '../../store';

export const compareDataSourcess = (a: DataSource, b: DataSource): boolean | undefined => {
    const recA = a as Record<string, unknown>;
    const recB = b as Record<string, unknown>;
    for (const key in a) {
        if (recA[key] !== recB[key]) {
            return false;
        }
    }
    return true;
};

export const deduplicateSchemaSources = (
    context: StoreContext,
    schemaSources: NestedSchemaSource[],
): SchemaSource[] => {
    const uniqueSchemas: SchemaSource[] = [];
    const seenUrnBases = new Map<string, NestedSchemaSource>();

    schemaSources.forEach(schema => {
        const existingSchema = seenUrnBases.get(schema.urnBase);
        if (!existingSchema) {
            seenUrnBases.set(schema.urnBase, schema);
            uniqueSchemas.push(schema);
            return;
        }
        const isSameId = existingSchema.urnBase === schema.urnBase;
        if (isSameId && !compareDataSourcess(existingSchema.source, schema.source)) {
            const error = createStoreSourceError({
                type: 'SchemaSource',
                id: schema.urnBase,
                source: schema.source,
                reason: `Inconsistent with definition "${JSON.stringify(existingSchema)}".`,
            });
            context.addError(error);
        }
    });

    return uniqueSchemas;
};
