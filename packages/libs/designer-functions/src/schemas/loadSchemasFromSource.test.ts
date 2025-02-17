import type { SchemaSource } from '@noodlestan/designer-decisions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resolveSourcePath } from '../helpers';
import { type StoreContext, type StoreOptions, createStoreContext } from '../store';

import { loadSchemasFromSource } from './loadSchemasFromSource';
import { loadSchemaFromFile, loadSchemasFromDirectory } from './private';
import type { SchemaData, SchemaId } from './types';

vi.mock('../helpers', () => ({
    resolveSourcePath: vi.fn(),
}));

vi.mock('./private/loadSchemasFromDirectory', () => ({
    loadSchemasFromDirectory: vi.fn(),
}));

vi.mock('./private/loadSchemaFromFile', () => ({
    loadSchemaFromFile: vi.fn(),
}));

const resolveSourcePathMock = vi.mocked(resolveSourcePath);
const loadSchemasFromDirectoryMock = vi.mocked(loadSchemasFromDirectory);
const loadSchemaFromFileMock = vi.mocked(loadSchemaFromFile);

const schemaSource: SchemaSource = { urnBase: 'foo', source: { type: 'path', path: '/foo' } };

describe('loadSchemasFromSource()', () => {
    const mockSource1: SchemaSource = { urnBase: 'foo', source: { type: 'path', path: '/foo' } };
    const options: StoreOptions = {
        schemas: [mockSource1],
        decisions: ['path'],
    };
    const mockSchema: SchemaData = {
        $id: 'schema1',
        type: 'object',
        properties: { key: { type: 'string' } },
    };
    let context: StoreContext;

    beforeEach(() => {
        context = createStoreContext(options);
        vi.clearAllMocks();
    });

    it('should load schemas from a single config', async () => {
        resolveSourcePathMock.mockResolvedValue('/dir1');
        loadSchemasFromDirectoryMock.mockImplementation(
            async (context, source, dirPath, fileHandler) => {
                if (dirPath === '/dir1') {
                    await fileHandler('/dir1/file1.json');
                }
            },
        );
        loadSchemaFromFileMock.mockImplementation(async (context, source, schemas, filePath) => {
            if (filePath === '/dir1/file1.json') {
                schemas.set('schema1', mockSchema);
            }
        });

        const schemas = new Map<SchemaId, SchemaData>();
        await loadSchemasFromSource(context, schemas, schemaSource);

        expect(schemas.size).toBe(1);
        expect(schemas.get('schema1')).toEqual(mockSchema);
        expect(loadSchemasFromDirectory).toHaveBeenCalledWith(
            context,
            schemaSource,
            '/dir1',
            expect.any(Function),
        );
        expect(loadSchemaFromFile).toHaveBeenCalledWith(
            context,
            schemaSource,
            expect.any(Map),
            '/dir1/file1.json',
        );
        expect(context.hasErrors()).toBe(false);
    });

    it('should throw an error if resolveSourcePath fails', async () => {
        resolveSourcePathMock.mockRejectedValue(new Error('Module resolution failed'));

        const schemas = new Map<SchemaId, SchemaData>();

        await loadSchemasFromSource(context, schemas, schemaSource);

        expect(context.hasErrors()).toBe(true);
        expect(context.errors().length).toBe(1);
        expect(context.errors()[0].message()).toContain('Invalid SchemaSource "foo"');
        expect(context.errors()[0].message()).toContain('Could not resolve path');
        expect(context.errors()[0].message()).toContain('Module resolution failed.');
        expect(context.errors()[0].message()).toContain('"path": "/foo"');

        expect(loadSchemasFromDirectory).not.toHaveBeenCalled();
        expect(loadSchemaFromFile).not.toHaveBeenCalled();
    });
});
