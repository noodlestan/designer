import fs from 'fs/promises';

import type { SchemaSource } from '@noodlestan/designer-decisions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type StoreContext, type StoreOptions, createStoreContext } from '../../store';
import type { SchemaMap } from '../types';

import { loadSchemaFromFile } from './loadSchemaFromFile';

const filePath = 'path/to/schema.json';

const validSchemaData = JSON.stringify({ $id: 'validSchemaId', type: 'object' });
const missingFileError = new Error('File not found');
const invalidJSONContent = 'invalid json content';
const schemaDataWithMissingID = JSON.stringify({ type: 'object' });
const duplicateSchemaData = JSON.stringify({ $id: 'duplicateId', type: 'object' });
const unexpectedError = new Error('Foo error');

const mockSource1: SchemaSource = { urnBase: 'foo', source: { type: 'path', path: '/foo' } };
const mockSource2: SchemaSource = {
    urnBase: 'bar',
    source: { type: 'package', package: '@', path: '/foo' },
};

describe('loadSchemaFromFile()', () => {
    const options: StoreOptions = {
        schemas: [mockSource1, mockSource2],
        decisions: ['path'],
    };
    const source: SchemaSource = {
        urnBase: 'foo',
        source: {
            type: 'path',
            path: 'bar/',
        },
    };
    let context: StoreContext;

    beforeEach(() => {
        context = createStoreContext(options);
        vi.resetAllMocks();
    });

    it('should load a valid schema and add it to the schema map', async () => {
        const schemas: SchemaMap = new Map();

        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(validSchemaData);

        await loadSchemaFromFile(context, source, schemas, filePath);

        expect(schemas.has('validSchemaId')).toBe(true);
        expect(schemas.get('validSchemaId')).toEqual({ $id: 'validSchemaId', type: 'object' });
    });

    it('should add error to the context if the file does not exist', async () => {
        vi.spyOn(fs, 'readFile').mockRejectedValueOnce(missingFileError);

        await loadSchemaFromFile(context, source, new Map(), filePath);

        expect(context.hasErrors()).toBe(true);
        expect(context.errors().length).toBe(1);
        expect(context.errors()[0].message()).toContain('Invalid SchemaSource "foo"');
        expect(context.errors()[0].message()).toContain('Could not read');
        expect(context.errors()[0].message()).toContain(filePath);
        expect(context.errors()[0].message()).toContain('"path": "bar/"');
    });

    it('should add error to the context if the file content is not valid JSON', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(invalidJSONContent);

        await loadSchemaFromFile(context, source, new Map(), filePath);

        expect(context.hasErrors()).toBe(true);
        expect(context.errors().length).toBe(1);
        expect(context.errors()[0].message()).toContain('Invalid SchemaSource "foo"');
        expect(context.errors()[0].message()).toContain('Could not parse');
        expect(context.errors()[0].message()).toContain('Unexpected token');
    });

    it('should add error to the context if the schema does not have a valid $id', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(schemaDataWithMissingID);

        await loadSchemaFromFile(context, source, new Map(), filePath);

        expect(context.hasErrors()).toBe(true);
        expect(context.errors().length).toBe(1);
        expect(context.errors()[0].message()).toContain('Invalid SchemaSource "foo"');
        expect(context.errors()[0].message()).toContain('Schema is missing a valid');
    });

    it('should add error to the context if a duplicate schema $id is found', async () => {
        const schemas: SchemaMap = new Map([
            ['duplicateId', { $id: 'duplicateId', type: 'object' }],
        ]);

        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(duplicateSchemaData);

        await loadSchemaFromFile(context, source, schemas, filePath);

        expect(context.hasErrors()).toBe(true);
        expect(context.errors().length).toBe(1);
        expect(context.errors()[0].message()).toContain('Invalid SchemaSource "foo"');
        expect(context.errors()[0].message()).toContain('Duplicate Schema $id "duplicateId"');
    });

    it('should handle and rethrow unexpected errors', async () => {
        vi.spyOn(fs, 'readFile').mockImplementationOnce(() => {
            throw unexpectedError;
        });

        await loadSchemaFromFile(context, source, new Map(), filePath);
        expect(context.hasErrors()).toBe(true);
        expect(context.errors().length).toBe(1);
        expect(context.errors()[0].message()).toContain('Could not read schema file.');
        expect(context.errors()[0].message()).toContain('Foo error');
    });
});
