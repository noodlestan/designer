import { type BuilderContext } from '../../builder';
import type { SchemaMap } from '../types';

import { extractSchemasReferencePairs, findMissingSchemaReferences } from './private';

export const validateSchemas = (context: BuilderContext, schemas: SchemaMap): void => {
    const referencePairs = extractSchemasReferencePairs(schemas);
    findMissingSchemaReferences(context, schemas, referencePairs);
};
