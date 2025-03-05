import { describe, expect, it } from 'vitest';

import { extractSchemaReferences } from './extractSchemaReferences';

const schemaDataWithoutRefs = {
    $id: 'schemaDataWithoutRefs',
    type: 'object',
    properties: { name: { type: 'string' } },
};

const schemaDataWithTopLevelRef = {
    $id: 'schemaDataWithTopLevelRef',
    $ref: '#/definitions/address',
};

const schemaDataWithNestedRefs = {
    $id: 'schemaDataWithNestedRefs',
    type: 'object',
    properties: {
        name: { type: 'string' },
        address: { $ref: '#/definitions/address' },
        contacts: {
            type: 'array',
            items: { $ref: '#/definitions/contact' },
        },
    },
};

const schemaDataWithDeepNestedRef = {
    $id: 'schemaDataWithDeepNestedRef',
    type: 'object',
    properties: {
        level1: {
            type: 'object',
            properties: {
                level2: {
                    type: 'object',
                    properties: {
                        level3: { $ref: '#/definitions/level3' },
                    },
                },
            },
        },
    },
};

const schemaDataWithInvalidRefValue = {
    $id: 'schemaDataWithInvalidRefValue',
    $ref: 12345,
};

const schemaDataWithMixedRefTypes = {
    $id: 'schemaDataWithMixedRefTypes',
    type: 'object',
    properties: {
        invalidRef: { $ref: 42 },
        validRef: { $ref: '#/definitions/address' },
    },
};

describe('extractSchemaReferences()', () => {
    it('should return an empty array when there are no $ref keys', () => {
        const result = extractSchemaReferences(schemaDataWithoutRefs);
        expect(result).toEqual([]);
    });

    it('should return a single $ref found at the top level', () => {
        const result = extractSchemaReferences(schemaDataWithTopLevelRef);
        expect(result).toEqual(['#/definitions/address']);
    });

    it('should return multiple $ref values from nested properties', () => {
        const result = extractSchemaReferences(schemaDataWithNestedRefs);
        expect(result).toEqual(['#/definitions/address', '#/definitions/contact']);
    });

    it('should handle deeply nested $ref values', () => {
        const result = extractSchemaReferences(schemaDataWithDeepNestedRef);
        expect(result).toEqual(['#/definitions/level3']);
    });

    it('should not extract $ref from non-string values', () => {
        const result = extractSchemaReferences(schemaDataWithInvalidRefValue);
        expect(result).toEqual([]);
    });

    it('should not extract $ref from values that are not strings within nested objects', () => {
        const result = extractSchemaReferences(schemaDataWithMixedRefTypes);
        expect(result).toEqual(['#/definitions/address']);
    });
});
