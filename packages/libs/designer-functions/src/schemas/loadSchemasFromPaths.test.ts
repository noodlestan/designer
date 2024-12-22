import { beforeEach, describe, expect, it, vi } from 'vitest';

import { loadSchemasFromPaths } from './loadSchemasFromPaths';
import { loadSchemaFromFile, loadSchemasFromDirectory } from './private';
import type { SchemaData } from './types';

vi.mock('./private/loadSchemasFromDirectory', () => ({
    loadSchemasFromDirectory: vi.fn(),
}));

vi.mock('./private/loadSchemaFromFile', () => ({
    loadSchemaFromFile: vi.fn(),
}));

const loadSchemasFromDirectoryMock = vi.mocked(loadSchemasFromDirectory);
const loadSchemaFromFileMock = vi.mocked(loadSchemaFromFile);

describe('loadSchemasFromPaths', () => {
    const mockSchema1: SchemaData = {
        $id: 'schema1',
        type: 'object',
        properties: { key: { type: 'string' } },
    };
    const mockSchema2: SchemaData = { $id: 'schema2', type: 'array', items: { type: 'number' } };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should load schemas from multiple paths', async () => {
        const mockPaths = ['/dir1', '/dir2'];

        loadSchemasFromDirectoryMock.mockImplementation(async (dirPath, fileHandler) => {
            if (dirPath === '/dir1') {
                await fileHandler('/dir1/file1.json');
            } else if (dirPath === '/dir2') {
                await fileHandler('/dir2/file2.json');
            }
        });

        loadSchemaFromFileMock.mockImplementation(async (schemas, filePath) => {
            if (filePath === '/dir1/file1.json') {
                schemas.set('schema1', mockSchema1);
            } else if (filePath === '/dir2/file2.json') {
                schemas.set('schema2', mockSchema2);
            }
        });

        const result = await loadSchemasFromPaths(mockPaths);

        expect(result.size).toBe(2);
        expect(result.get('schema1')).toEqual(mockSchema1);
        expect(result.get('schema2')).toEqual(mockSchema2);
        expect(loadSchemasFromDirectory).toHaveBeenCalledTimes(2);
        expect(loadSchemaFromFile).toHaveBeenCalledTimes(2);
    });

    it('should throw an error when loadSchemaFromFile fails', async () => {
        const mockPaths = ['/dir1'];

        loadSchemasFromDirectoryMock.mockImplementation(async (dirPath, fileHandler) => {
            if (dirPath === '/dir1') {
                await fileHandler('/dir1/file1.json');
            }
        });

        loadSchemaFromFileMock.mockImplementation(async (schemas, filePath) => {
            throw new Error(`Error loading schema from "${filePath}": invalid content.`);
        });

        await expect(loadSchemasFromPaths(mockPaths)).rejects.toThrow(
            'Error loading schema from "/dir1/file1.json": invalid content.',
        );

        expect(loadSchemasFromDirectory).toHaveBeenCalledTimes(1);
        expect(loadSchemaFromFile).toHaveBeenCalledTimes(1);
    });
});
