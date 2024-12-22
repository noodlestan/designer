import { loadSchemaFromFile, loadSchemasFromDirectory } from './private';
import type { SchemaData, SchemaId, SchemaMap } from './types';

export const loadSchemasFromPaths = async (paths: string[]): Promise<SchemaMap> => {
    const schemas = new Map<SchemaId, SchemaData>();
    for (const directoryPath of paths) {
        await loadSchemasFromDirectory(directoryPath, filePath =>
            loadSchemaFromFile(schemas, filePath),
        );
    }
    return schemas;
};
