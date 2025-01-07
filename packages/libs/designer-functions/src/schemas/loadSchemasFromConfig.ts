import type { SchemaConfig } from '@noodlestan/designer-decisions';

import { resolveSourcePath } from '../helpers';

import { loadSchemaFromFile, loadSchemasFromDirectory } from './private';
import type { SchemaMap } from './types';

export const loadSchemasFromConfig = async (
    schemas: SchemaMap,
    config: SchemaConfig,
    moduleResolver: (moduleName: string) => Promise<string>,
): Promise<void> => {
    const path = await resolveSourcePath(config.source, moduleResolver);
    await loadSchemasFromDirectory(path, filePath => loadSchemaFromFile(schemas, filePath));
};
