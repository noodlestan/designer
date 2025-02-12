import type { SchemaSource } from '@noodlestan/designer-decisions';

import { resolveSourcePath } from '../helpers';

import { loadSchemaFromFile, loadSchemasFromDirectory } from './private';
import type { SchemaMap } from './types';

export const loadSchemasFromConfig = async (
    schemas: SchemaMap,
    config: SchemaSource,
    moduleResolver?: (moduleName: string) => Promise<string>,
): Promise<void> => {
    const path = await resolveSourcePath(config.source, moduleResolver);
    await loadSchemasFromDirectory(path, filePath => loadSchemaFromFile(schemas, filePath));
};
