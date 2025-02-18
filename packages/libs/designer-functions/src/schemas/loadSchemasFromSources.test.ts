import type { SchemaSource } from '@noodlestan/designer-decisions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type StoreContext, type StoreOptions, createStoreContext } from '../store';

import { loadSchemasFromSource } from './functions/loadSchemasFromSource';
import { loadSchemasFromSources } from './loadSchemasFromSources';
import type { SchemaData, SchemaMap } from './types';

vi.mock('./functions/loadSchemasFromSource');

const loadSchemasFromSourceMock = vi.mocked(loadSchemasFromSource);

const mockSource1: SchemaSource = { urnBase: 'foo', source: { type: 'path', path: '/foo' } };
const mockSource2: SchemaSource = {
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

describe('loadSchemasFromSources()', () => {
    const options: StoreOptions = {
        schemas: [mockSource1, mockSource2],
        decisions: ['path'],
    };
    let context: StoreContext;

    beforeEach(() => {
        context = createStoreContext(options);
        vi.clearAllMocks();
    });

    it('should load and aggregate schemas from multiple configs', async () => {
        loadSchemasFromSourceMock.mockImplementationOnce(
            async (context: StoreContext, schemaMap: SchemaMap) => {
                schemaMap.set('schema1', mockSchema1);
            },
        );
        loadSchemasFromSourceMock.mockImplementationOnce(
            async (context: StoreContext, schemaMap: SchemaMap) => {
                schemaMap.set('schema2', mockSchema2);
            },
        );

        const result = await loadSchemasFromSources(context);

        expect(result.size).toEqual(2);
        expect(result.get('schema1')).toEqual(mockSchema1);
        expect(result.get('schema2')).toEqual(mockSchema2);
        expect(loadSchemasFromSource).toHaveBeenCalledTimes(2);
    });
});
