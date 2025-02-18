import { type StoreContext } from '../../store';
import type { SchemaMap } from '../types';

import { extractSchemasReferencePairs, findMissingSchemaReferences } from './private';

export const validateSchemas = (context: StoreContext, schemas: SchemaMap): void => {
    const referencePairs = extractSchemasReferencePairs(schemas);
    findMissingSchemaReferences(context, schemas, referencePairs);
};
