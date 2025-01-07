import type { SchemaConfig } from '@noodlestan/designer-decisions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resolveSourcePath } from '../helpers';

import { loadSchemasFromConfig } from './loadSchemasFromConfig';
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

const resolveSourcePathMocked = resolveSourcePathMock as unknown as (
    moduleName: string,
) => Promise<string>;

const mockConfig: SchemaConfig = { urnBase: 'foo', source: { type: 'path', path: '/foo' } };

describe('loadSchemasFromConfig', () => {
    const mockSchema: SchemaData = {
        $id: 'schema1',
        type: 'object',
        properties: { key: { type: 'string' } },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should load schemas from a single config', async () => {
        resolveSourcePathMock.mockResolvedValue('/dir1');
        loadSchemasFromDirectoryMock.mockImplementation(async (dirPath, fileHandler) => {
            if (dirPath === '/dir1') {
                await fileHandler('/dir1/file1.json');
            }
        });
        loadSchemaFromFileMock.mockImplementation(async (schemas, filePath) => {
            if (filePath === '/dir1/file1.json') {
                schemas.set('schema1', mockSchema);
            }
        });

        const schemas = new Map<SchemaId, SchemaData>();
        await loadSchemasFromConfig(schemas, mockConfig, resolveSourcePathMocked);

        expect(schemas.size).toBe(1);
        expect(schemas.get('schema1')).toEqual(mockSchema);
        expect(resolveSourcePath).toHaveBeenCalledWith(mockConfig.source, resolveSourcePathMock);
        expect(loadSchemasFromDirectory).toHaveBeenCalledWith('/dir1', expect.any(Function));
        expect(loadSchemaFromFile).toHaveBeenCalledWith(expect.any(Map), '/dir1/file1.json');
    });

    it('should throw an error if resolveSourcePath fails', async () => {
        resolveSourcePathMock.mockRejectedValue(new Error('Module resolution failed'));

        const schemas = new Map<SchemaId, SchemaData>();
        await expect(
            loadSchemasFromConfig(schemas, mockConfig, resolveSourcePathMocked),
        ).rejects.toThrow('Module resolution failed');

        expect(resolveSourcePath).toHaveBeenCalledWith(mockConfig.source, resolveSourcePathMock);
        expect(loadSchemasFromDirectory).not.toHaveBeenCalled();
        expect(loadSchemaFromFile).not.toHaveBeenCalled();
    });
});
