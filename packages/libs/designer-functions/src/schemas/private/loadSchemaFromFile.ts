import fs from 'fs/promises';

import type { SchemaData, SchemaMap } from '../types';

export const loadSchemaFromFile = async (schemas: SchemaMap, filePath: string): Promise<void> => {
    const errorPrefix = `Error loading schema from "${filePath}"`;

    let schemaData;
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        schemaData = JSON.parse(fileContent) as SchemaData;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`${errorPrefix}: ${message}.`);
    }

    if (typeof schemaData.$id !== 'string' || !schemaData.$id) {
        throw new Error(`${errorPrefix}: missing a valid "$id" property.`);
    }

    if (schemas.has(schemaData.$id)) {
        throw new Error(`${errorPrefix}: duplicate schema id "${schemaData.$id}".`);
    }

    schemas.set(schemaData.$id, schemaData);
};
