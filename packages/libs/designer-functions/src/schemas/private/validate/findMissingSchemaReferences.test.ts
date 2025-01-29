import { describe, expect, it } from 'vitest';

import type { SchemaId } from '../../types';

import { findMissingSchemaReferences } from './findMissingSchemaReferences';

const schemaMapWithAllRefsPresent = new Map([
    ['schema1', { $id: 'schema1', type: 'object', properties: { name: { type: 'string' } } }],
    ['schema2', { $id: 'schema2', type: 'object', properties: { age: { type: 'number' } } }],
]);

const referencePairsWithAllRefsPresent: [SchemaId, SchemaId][] = [['schema1', 'schema2']];

const schemaMapWithMissingRefs = new Map([
    ['schema1', { $id: 'schema1', type: 'object', properties: { name: { type: 'string' } } }],
    ['schema2', { $id: 'schema2', type: 'object', properties: { age: { type: 'number' } } }],
]);

const referencePairsWithMissingRefs: [SchemaId, SchemaId][] = [
    ['schema1', 'missingSchema1'],
    ['schema2', 'missingSchema2'],
];

const schemaMapWithMixedRefs = new Map([
    ['schema1', { $id: 'schema1', type: 'object', properties: { name: { type: 'string' } } }],
    ['schema2', { $id: 'schema2', type: 'object', properties: { age: { type: 'number' } } }],
]);

const referencePairsWithMixedRefs: [SchemaId, SchemaId][] = [
    ['schema1', 'missingSchema1'],
    ['schema2', 'schema1'],
    ['schema2', 'missingSchema2'],
];

describe('findMissingSchemaReferences()', () => {
    it('should return an empty array when all references are present in the schema map', () => {
        const result = findMissingSchemaReferences(
            schemaMapWithAllRefsPresent,
            referencePairsWithAllRefsPresent,
        );
        expect(result).toEqual([]);
    });

    it('should return missing references with the schemas where they were found', () => {
        const result = findMissingSchemaReferences(
            schemaMapWithMissingRefs,
            referencePairsWithMissingRefs,
        );
        expect(result).toEqual([
            ['missingSchema1', ['schema1']],
            ['missingSchema2', ['schema2']],
        ]);
    });

    it('should return missing references and ignore valid references', () => {
        const result = findMissingSchemaReferences(
            schemaMapWithMixedRefs,
            referencePairsWithMixedRefs,
        );
        expect(result).toEqual([
            ['missingSchema1', ['schema1']],
            ['missingSchema2', ['schema2']],
        ]);
    });

    it('should return an empty array when there are no reference pairs', () => {
        const result = findMissingSchemaReferences(schemaMapWithAllRefsPresent, []);
        expect(result).toEqual([]);
    });

    it('should handle reference pairs with no corresponding schemas in an empty schema map', () => {
        const result = findMissingSchemaReferences(new Map(), referencePairsWithMissingRefs);
        expect(result).toEqual([
            ['missingSchema1', ['schema1']],
            ['missingSchema2', ['schema2']],
        ]);
    });
});
