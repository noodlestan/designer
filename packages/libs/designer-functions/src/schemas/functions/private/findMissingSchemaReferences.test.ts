import { beforeEach, describe, expect, it } from 'vitest';

import { type StoreContext, createStoreContext } from '../../../store';
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
    let context: StoreContext;

    beforeEach(() => {
        context = createStoreContext();
    });

    it('should return an empty array when all references are present in the schema map', () => {
        findMissingSchemaReferences(
            context,
            schemaMapWithAllRefsPresent,
            referencePairsWithAllRefsPresent,
        );
        expect(context.hasErrors()).toEqual(false);
    });

    it('should return missing references with the schemas where they were found', () => {
        findMissingSchemaReferences(
            context,
            schemaMapWithMissingRefs,
            referencePairsWithMissingRefs,
        );
        expect(context.errors().length).toEqual(2);
        expect(context.errors()[0].message()).toEqual(
            'Invalid schema "schema1". Missing references: [missingSchema1].',
        );
        expect(context.errors()[1].message()).toEqual(
            'Invalid schema "schema2". Missing references: [missingSchema2].',
        );
    });

    it('should return missing references and ignore valid references', () => {
        findMissingSchemaReferences(context, schemaMapWithMixedRefs, referencePairsWithMixedRefs);
        expect(context.errors().length).toEqual(2);
        expect(context.errors()[0].message()).toEqual(
            'Invalid schema "schema1". Missing references: [missingSchema1].',
        );
        expect(context.errors()[1].message()).toEqual(
            'Invalid schema "schema2". Missing references: [missingSchema2].',
        );
    });

    it('should return an empty array when there are no reference pairs', () => {
        findMissingSchemaReferences(context, schemaMapWithAllRefsPresent, []);
        expect(context.hasErrors()).toEqual(false);
    });

    it('should handle reference pairs with no corresponding schemas in an empty schema map', () => {
        findMissingSchemaReferences(context, new Map(), referencePairsWithMissingRefs);
        expect(context.errors().length).toEqual(2);
        expect(context.errors()[0].message()).toEqual(
            'Invalid schema "schema1". Missing references: [missingSchema1].',
        );
        expect(context.errors()[1].message()).toEqual(
            'Invalid schema "schema2". Missing references: [missingSchema2].',
        );
    });
});
