import { describe, expect, it } from 'vitest';

import { extractSchemasReferencePairs } from './extractSchemasReferencePairs';

const schemaMapWithNoRefs = new Map([
    ['schema1', { $id: 'schema1', type: 'object', properties: { name: { type: 'string' } } }],
    ['schema2', { $id: 'schema2', type: 'object', properties: { age: { type: 'number' } } }],
]);

const schemaMapWithSingleRef = new Map([
    ['schema1', { $id: 'schema1', $ref: '#/definitions/address' }],
]);

const schemaMapWithMultipleRefs = new Map([
    ['schema1', { $id: 'schema1', properties: { address: { $ref: '#/definitions/address' } } }],
    ['schema2', { $id: 'schema2', properties: { contact: { $ref: '#/definitions/contact' } } }],
]);

const schemaMapWithDeepRefs = new Map([
    [
        'schema1',
        {
            $id: 'schema1',
            properties: {
                level1: {
                    properties: {
                        level2: {
                            properties: {
                                level3: { $ref: '#/definitions/level3' },
                            },
                        },
                    },
                },
            },
        },
    ],
]);

const schemaMapWithInvalidRef = new Map([['schema1', { $id: 'schema1', $ref: 12345 }]]);

const schemaMapWithMixedRefs = new Map([
    [
        'schema1',
        {
            $id: 'schema1',
            properties: { invalidRef: { $ref: 42 }, validRef: { $ref: '#/definitions/address' } },
        },
    ],
]);

describe('extractSchemasReferencePairs', () => {
    it('should return an empty array when no $ref keys are found in any schema', () => {
        const result = extractSchemasReferencePairs(schemaMapWithNoRefs);
        expect(result).toEqual([]);
    });

    it('should extract a single reference from a schema with a top-level $ref', () => {
        const result = extractSchemasReferencePairs(schemaMapWithSingleRef);
        expect(result).toEqual([['schema1', '#/definitions/address']]);
    });

    it('should extract multiple references from multiple schemas', () => {
        const result = extractSchemasReferencePairs(schemaMapWithMultipleRefs);
        expect(result).toEqual([
            ['schema1', '#/definitions/address'],
            ['schema2', '#/definitions/contact'],
        ]);
    });

    it('should extract deeply nested references within schemas', () => {
        const result = extractSchemasReferencePairs(schemaMapWithDeepRefs);
        expect(result).toEqual([['schema1', '#/definitions/level3']]);
    });

    it('should not extract $ref keys with non-string values', () => {
        const result = extractSchemasReferencePairs(schemaMapWithInvalidRef);
        expect(result).toEqual([]);
    });

    it('should handle schemas with mixed valid and invalid $ref values', () => {
        const result = extractSchemasReferencePairs(schemaMapWithMixedRefs);
        expect(result).toEqual([['schema1', '#/definitions/address']]);
    });
});
