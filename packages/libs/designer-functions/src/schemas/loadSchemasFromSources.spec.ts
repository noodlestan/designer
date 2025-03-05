import { DECISION_SCHEMAS, type SchemaSource } from '@noodlestan/designer-decisions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type BuilderContext, type BuilderOptions, createBuilderContext } from '../builder';

import { loadSchemasFromSource } from './functions/loadSchemasFromSource';
import { loadSchemasFromSources } from './loadSchemasFromSources';
import type { SchemaData, SchemaMap } from './types';

vi.mock('./functions/loadSchemasFromSource');

const loadSchemasFromSourceMock = vi.mocked(loadSchemasFromSource);

const builtInSource = { ...DECISION_SCHEMAS, decisionSourceName: 'built-in' };

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
const mockSchema3: SchemaData = {
    $id: 'schema3',
    type: 'array',
    items: { type: 'number' },
};

describe('loadSchemasFromSources()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given no schema sources provided', () => {
        const options: BuilderOptions = {
            decisions: ['path'],
        };
        let context: BuilderContext;

        beforeEach(() => {
            context = createBuilderContext(options);
        });

        it('should load the built-in schemas', async () => {
            loadSchemasFromSourceMock.mockImplementationOnce(
                async (context: BuilderContext, schemaMap: SchemaMap) => {
                    schemaMap.set('schema1', mockSchema1);
                },
            );

            const result = await loadSchemasFromSources(context);

            expect(result.size).toEqual(1);
            expect(result.get('schema1')).toEqual(mockSchema1);
            expect(loadSchemasFromSource).toHaveBeenCalledTimes(1);
            expect(loadSchemasFromSourceMock).toHaveBeenCalledWith(
                context,
                expect.any(Map),
                builtInSource,
            );
        });
    });

    describe('Given schema sources is provided', () => {
        const options: BuilderOptions = {
            schemas: [mockSource1, mockSource2],
            decisions: ['path'],
        };
        let context: BuilderContext;

        beforeEach(() => {
            context = createBuilderContext(options);
        });

        it('should load and aggregate schemas from multiple configs', async () => {
            loadSchemasFromSourceMock.mockImplementationOnce(
                async (context: BuilderContext, schemaMap: SchemaMap) => {
                    schemaMap.set('schema1', mockSchema1);
                },
            );
            loadSchemasFromSourceMock.mockImplementationOnce(
                async (context: BuilderContext, schemaMap: SchemaMap) => {
                    schemaMap.set('schema2', mockSchema2);
                },
            );
            loadSchemasFromSourceMock.mockImplementationOnce(
                async (context: BuilderContext, schemaMap: SchemaMap) => {
                    schemaMap.set('schema3', mockSchema3);
                },
            );

            const result = await loadSchemasFromSources(context);

            expect(result.size).toEqual(3);
            expect(result.get('schema1')).toEqual(mockSchema1);
            expect(result.get('schema2')).toEqual(mockSchema2);
            expect(result.get('schema3')).toEqual(mockSchema3);
            expect(loadSchemasFromSource).toHaveBeenCalledTimes(3);
            expect(loadSchemasFromSourceMock).toHaveBeenCalledWith(
                context,
                expect.any(Map),
                builtInSource,
            );
            expect(loadSchemasFromSourceMock).toHaveBeenCalledWith(
                context,
                expect.any(Map),
                mockSource1,
            );
            expect(loadSchemasFromSourceMock).toHaveBeenCalledWith(
                context,
                expect.any(Map),
                mockSource2,
            );
        });
    });

    describe('Given duplicate schema sources provided', () => {
        const options: BuilderOptions = {
            schemas: [mockSource1, mockSource1],
            decisions: ['path'],
        };
        let context: BuilderContext;

        beforeEach(() => {
            context = createBuilderContext(options);
        });

        it('should deduplicate schema sources', async () => {
            loadSchemasFromSourceMock.mockImplementationOnce(
                async (context: BuilderContext, schemaMap: SchemaMap) => {
                    schemaMap.set('schema1', mockSchema1);
                },
            );
            loadSchemasFromSourceMock.mockImplementationOnce(
                async (context: BuilderContext, schemaMap: SchemaMap) => {
                    schemaMap.set('schema2', mockSchema2);
                },
            );
            loadSchemasFromSourceMock.mockImplementationOnce(
                async (context: BuilderContext, schemaMap: SchemaMap) => {
                    schemaMap.set('schema3', mockSchema2);
                },
            );

            const result = await loadSchemasFromSources(context);

            expect(result.size).toEqual(2);
            expect(result.get('schema1')).toEqual(mockSchema1);
            expect(result.get('schema2')).toEqual(mockSchema2);
            expect(loadSchemasFromSource).toHaveBeenCalledTimes(2);
            expect(loadSchemasFromSourceMock).toHaveBeenCalledWith(
                context,
                expect.any(Map),
                builtInSource,
            );
            expect(loadSchemasFromSourceMock).toHaveBeenCalledWith(
                context,
                expect.any(Map),
                mockSource1,
            );
        });
    });
});
