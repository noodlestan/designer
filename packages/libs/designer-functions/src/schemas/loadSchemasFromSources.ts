import type { StoreContext } from '../store';

import { validateSchemaMap } from './functions';
import { loadSchemasFromSource } from './functions/loadSchemasFromSource';
import type { SchemaData, SchemaId, SchemaMap } from './types';

export const loadSchemasFromSources = async (context: StoreContext): Promise<SchemaMap> => {
    const { schemas: schemaSources } = context.options();

    const schemas = new Map<SchemaId, SchemaData>();
    for (const source of schemaSources) {
        await loadSchemasFromSource(context, schemas, source);
    }

    return validateSchemaMap(context, schemas);
};
