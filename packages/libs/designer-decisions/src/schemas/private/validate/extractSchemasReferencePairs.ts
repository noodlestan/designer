import type { SchemaId, SchemaMap } from '../../types';

import { extractSchemaReferences } from './extractSchemaReferences';

export const extractSchemasReferencePairs = (schemas: SchemaMap): [SchemaId, SchemaId][] => {
    const pairs: [SchemaId, SchemaId][] = [];

    for (const [schemaId, schemaData] of schemas.entries()) {
        const references = extractSchemaReferences(schemaData);
        references.forEach(ref => pairs.push([schemaId, ref]));
    }

    return pairs;
};
