import type { SchemaConfig } from '@noodlestan/designer-decisions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { loadSchemasFromConfig } from './loadSchemasFromConfig';
import { loadSchemasFromConfigs } from './loadSchemasFromConfigs';
import type { SchemaData, SchemaMap } from './types';

vi.mock('./loadSchemasFromConfig', () => ({
    loadSchemasFromConfig: vi.fn(),
}));

const loadSchemasFromConfigMock = vi.mocked(loadSchemasFromConfig);

const mockConfig1: SchemaConfig = { urnBase: 'foo', source: { type: 'path', path: '/foo' } };
const mockConfig2: SchemaConfig = {
    urnBase: 'bar',
    source: { type: 'package', package: '@', path: '/foo' },
};
const mockSchema1: SchemaData = {
    $id: 'schema1',
    type: 'object',
    properties: { key: { type: 'string' } },
};
const mockSchema2: SchemaData = {
    $id: 'schema2',
    type: 'array',
    items: { type: 'number' },
};

describe('loadSchemasFromConfigs', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should load and aggregate schemas from multiple configs', async () => {
        const mockConfigs: SchemaConfig[] = [mockConfig1, mockConfig2];

        loadSchemasFromConfigMock.mockImplementationOnce(async (schemaMap: SchemaMap) => {
            schemaMap.set('schema1', mockSchema1);
        });
        loadSchemasFromConfigMock.mockImplementationOnce(async (schemaMap: SchemaMap) => {
            schemaMap.set('schema2', mockSchema2);
        });

        const result = await loadSchemasFromConfigs(mockConfigs, vi.fn());

        expect(result.size).toBe(2);
        expect(result.get('schema1')).toEqual(mockSchema1);
        expect(result.get('schema2')).toEqual(mockSchema2);
        expect(loadSchemasFromConfig).toHaveBeenCalledTimes(2);
    });

    it('should throw an error if one of the configs fails', async () => {
        const mockConfigs: SchemaConfig[] = [mockConfig1, mockConfig2];

        loadSchemasFromConfigMock.mockImplementationOnce(async (schemaMap: SchemaMap) => {
            schemaMap.set('schema1', mockSchema1);
        });
        loadSchemasFromConfigMock.mockRejectedValueOnce(new Error('Failed to load config'));

        await expect(loadSchemasFromConfigs(mockConfigs, vi.fn())).rejects.toThrow(
            'Failed to load config',
        );

        expect(loadSchemasFromConfig).toHaveBeenCalledTimes(2);
    });
});
