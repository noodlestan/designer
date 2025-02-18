import type { StoreContext } from '../store';

import { loadSchemasFromSource } from './loadSchemasFromSource';
import type { SchemaData, SchemaId, SchemaMap } from './types';

export const loadSchemasFromConfigs = async (context: StoreContext): Promise<SchemaMap> => {
    const { schemas: schemaSources } = context.options();

    const schemas = new Map<SchemaId, SchemaData>();

    for (const source of schemaSources) {
        await loadSchemasFromSource(context, schemas, source);
    }
    return schemas;
};
