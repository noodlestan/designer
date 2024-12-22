import { validateSchemas } from './private';
import type { SchemaMap } from './types';

export const validateSchemaMap = (schemas: SchemaMap): SchemaMap => {
    validateSchemas(schemas);

    return structuredClone(schemas);
};
