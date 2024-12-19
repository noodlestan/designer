import { describe, expect, it } from 'vitest';

import { validateSchemas } from './validateSchemas';

const schemaMapWithNoSchemas = new Map();

const schemaMapWithValidRefs = new Map([
    [
        'schema1',
        {
            $id: 'schema1',
            type: 'object',
            properties: { name: { type: 'string' }, ref: { $ref: 'schema2' } },
        },
    ],
    ['schema2', { $id: 'schema2', type: 'object', properties: { age: { type: 'number' } } }],
]);

const schemaMapWithMissingRefs = new Map([
    [
        'schema1',
        {
            $id: 'schema1',
            type: 'object',
            properties: { name: { type: 'string' }, ref: { $ref: 'missingSchema' } },
        },
    ],
    ['schema2', { $id: 'schema2', type: 'object', properties: { age: { type: 'number' } } }],
]);

describe('validateSchemas', () => {
    it('should not throw when schema map is empty', () => {
        expect(() => validateSchemas(schemaMapWithNoSchemas)).not.toThrow();
    });

    it('should not throw when all references are resolved', () => {
        expect(() => validateSchemas(schemaMapWithValidRefs)).not.toThrow();
    });

    it('should throw an error when references are missing', () => {
        expect(() => validateSchemas(schemaMapWithMissingRefs)).toThrow(
            'Error loading schemas. One or more references could not be resolved. Missing schema "missingSchema", referenced in "schema1".',
        );
    });
});
