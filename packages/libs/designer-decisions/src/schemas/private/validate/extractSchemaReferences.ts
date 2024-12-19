import { SchemaData, SchemaId } from '../../types';

export const extractSchemaReferences = (schemaData: SchemaData): SchemaId[] => {
    const references: SchemaId[] = [];

    const traverse = (data: unknown) => {
        if (!data || typeof data !== 'object') {
            return;
        }

        for (const [key, value] of Object.entries(data)) {
            if (key === '$ref' && typeof value === 'string') {
                references.push(value);
            } else {
                traverse(value);
            }
        }
    };
    traverse(schemaData);
    return references;
};
