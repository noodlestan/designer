import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type StoreContext, createStoreContext } from '../../store';
import type { SchemaData, SchemaId, SchemaMap } from '../types';

import { validateSchemaMap } from './validateSchemaMap';

const mockValidSchemaMap: SchemaMap = new Map<SchemaId, SchemaData>([
    ['schema1', { $id: 'schema1', type: 'object', properties: { key: { type: 'string' } } }],
    ['schema2', { $id: 'schema2', type: 'array', items: { type: 'number' } }],
]);

const mockInvalidSchemaMap = new Map<SchemaId, SchemaData>([
    ['schema1', { $id: 'schema1', invalidProp: 'not valid' }],
    ['schema2', { $id: 'schema2', $ref: 'schema3' }],
]);

describe('validateSchemaMap()', () => {
    let context: StoreContext;

    beforeEach(() => {
        context = createStoreContext();
        vi.resetAllMocks();
    });

    it('should create a SchemaLoader with valid schemas', () => {
        const loadedSchemas = validateSchemaMap(context, mockValidSchemaMap);

        expect(loadedSchemas).toEqual(mockValidSchemaMap);
    });

    it('should return a new map', () => {
        const loadedSchemas = validateSchemaMap(context, mockValidSchemaMap);

        expect(loadedSchemas).not.toBe(mockValidSchemaMap);
    });

    it('should throw an error when given an invalid schema map', () => {
        validateSchemaMap(context, mockInvalidSchemaMap);

        expect(context.hasErrors()).toBe(true);
        expect(context.errors().length).toBe(1);
        expect(context.errors()[0].message()).toContain(
            'Invalid schema "schema2". Missing references: [schema3]',
        );
    });
});
