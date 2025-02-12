import type { SchemaSource } from '@noodlestan/designer-decisions';

import { loadSchemasFromConfig } from './loadSchemasFromConfig';
import type { SchemaData, SchemaId, SchemaMap } from './types';

export const loadSchemasFromConfigs = async (
    configs: SchemaSource[],
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<SchemaMap> => {
    const schemas = new Map<SchemaId, SchemaData>();

    for (const config of configs) {
        await loadSchemasFromConfig(schemas, config, moduleResolver);
    }
    return schemas;
};
