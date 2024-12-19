import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SchemaData, SchemaId, SchemaMap } from './types';
import { validateSchemaMap } from './validateSchemaMap';

const mockValidSchemaMap: SchemaMap = new Map<SchemaId, SchemaData>([
    ['schema1', { $id: 'schema1', type: 'object', properties: { key: { type: 'string' } } }],
    ['schema2', { $id: 'schema2', type: 'array', items: { type: 'number' } }],
]);

const mockInvalidSchemaMap = new Map<SchemaId, SchemaData>([
    ['schema1', { $id: 'schema1', invalidProp: 'not valid' }],
    ['schema2', { $id: 'schema2', $ref: 'schema3' }],
]);

describe('validateSchemaMap', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should create a SchemaLoader with valid schemas', () => {
        const loadedSchemas = validateSchemaMap(mockValidSchemaMap);

        expect(loadedSchemas).toEqual(mockValidSchemaMap);
        expect(loadedSchemas).not.toBe(mockValidSchemaMap);
    });

    it('should throw an error when given an invalid schema map', () => {
        expect(() => validateSchemaMap(mockInvalidSchemaMap)).toThrow('could not be resolved');
    });
});
