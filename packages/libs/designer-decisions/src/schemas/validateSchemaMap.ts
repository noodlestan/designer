import { validateSchemas } from './private';
import { SchemaMap } from './types';

export const validateSchemaMap = (schemas: SchemaMap): SchemaMap => {
    validateSchemas(schemas);

    return structuredClone(schemas);
};
