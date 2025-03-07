import type { DataSource } from '@noodlestan/designer-decisions';
import { describe, expect, it } from 'vitest';

import type { BuilderSourceError } from '../types';

import { ERROR_BUILDER_SOURCE, ERROR_LAYER_BUILDER } from './constants';
import { createBuilderSourceError } from './createBuilderSourceError';

describe('createBuilderSourceError()', () => {
    describe('Given a SchemaSource error', () => {
        const type: BuilderSourceError['type'] = 'SchemaSource';
        const sourceType: DataSource['type'] = 'path';
        const attributes = {
            type,
            id: '123',
            source: {
                type: sourceType,
                path: 'data/',
            },
            path: '/foo',
            reason: 'because bar',
        };

        it('should return a BuilderError object with the expected name', () => {
            const result = createBuilderSourceError(attributes);
            expect(result.layer).toBe(ERROR_LAYER_BUILDER);
            expect(result.name).toBe(ERROR_BUILDER_SOURCE);
            expect(result.name).toEqual(ERROR_BUILDER_SOURCE);
        });

        it('should return a BuilderError object with the expected attributes', () => {
            const result = createBuilderSourceError(attributes);
            expect(result.type).toEqual(attributes.type);
            expect(result.id).toEqual(attributes.id);
            expect(result.path).toEqual(attributes.path);
            expect(result.source).toEqual(attributes.source);
            expect(result.reason).toEqual(attributes.reason);
            expect(result.error).toEqual(undefined);
        });

        it('should return a BuilderError object with the expected message', () => {
            const result = createBuilderSourceError(attributes);
            expect(result.message()).toContain('Invalid SchemaSource');
            expect(result.message()).toContain('/foo');
            expect(result.message()).toContain('because bar');
            expect(result.message()).toContain('"path":"data/"');
        });
    });
});
