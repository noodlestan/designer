import { DECISION_SCHEMAS, type NestedSchemaSource } from '@noodlestan/designer-decisions';

import { normalizeDecisionSource } from '../private';
import type { StoreContext } from '../store';

import { validateSchemaMap } from './functions';
import { deduplicateSchemaSources } from './functions/deduplicateSchemaSources';
import { loadSchemasFromSource } from './functions/loadSchemasFromSource';
import { resolveReferencedSchemaSources } from './functions/resolveReferencedSchemaSources';
import type { SchemaData, SchemaId, SchemaMap } from './types';

export const loadSchemasFromSources = async (context: StoreContext): Promise<SchemaMap> => {
    const { schemas: schemaSources, decisions: decisionSources } = context.options();

    const sources = decisionSources.map(normalizeDecisionSource);
    const nestedSchemas = resolveReferencedSchemaSources(sources);

    const builtInSchemas: NestedSchemaSource = {
        ...DECISION_SCHEMAS,
        decisionSourceName: 'built-in',
    };

    const uniqueSchemas = deduplicateSchemaSources(context, [
        builtInSchemas,
        ...nestedSchemas,
        ...(schemaSources || []),
    ]);

    const schemas = new Map<SchemaId, SchemaData>();
    for (const source of uniqueSchemas) {
        await loadSchemasFromSource(context, schemas, source);
    }

    return validateSchemaMap(context, schemas);
};
