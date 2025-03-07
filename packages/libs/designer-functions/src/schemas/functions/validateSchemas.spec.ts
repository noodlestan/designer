import { beforeEach, describe, expect, it } from 'vitest';

import { type BuilderContext, ERROR_BUILDER_SCHEMA, createBuilderContext } from '../../builder';

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

describe('validateSchemas()', () => {
    let context: BuilderContext;

    beforeEach(() => {
        context = createBuilderContext();
    });

    it('should not throw when schema map is empty', () => {
        validateSchemas(context, schemaMapWithNoSchemas);
        expect(context.hasErrors()).toBe(false);
    });

    it('should not throw when all references are resolved', () => {
        validateSchemas(context, schemaMapWithValidRefs);
        expect(context.hasErrors()).toBe(false);
    });

    it('should throw an error when references are missing', () => {
        validateSchemas(context, schemaMapWithMissingRefs);
        expect(context.hasErrors()).toBe(true);
        expect(context.errors()[0].name).toEqual(ERROR_BUILDER_SCHEMA);
        expect(context.errors()[0].message()).toContain('Invalid schema "schema1"');
        expect(context.errors()[0].message()).toContain('Missing references: [missingSchema].');
    });
});
