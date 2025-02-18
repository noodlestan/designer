import type { DataSource } from '@noodlestan/designer-decisions';
import { describe, expect, it } from 'vitest';

import type { StoreSourceError } from '../types';

import { ERROR_STORE_SOURCE } from './constants';
import { createStoreSourceError } from './createStoreSourceError';

describe('createStoreSourceError()', () => {
    describe('Given a SchemaSource error', () => {
        const type: StoreSourceError['type'] = 'SchemaSource';
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

        it('should return a StoreError object with the expected name', () => {
            const result = createStoreSourceError(attributes);

            expect(result.name).toEqual(ERROR_STORE_SOURCE);
        });

        it('should return a StoreError object with the expected attributes', () => {
            const result = createStoreSourceError(attributes);

            expect(result.type).toEqual(attributes.type);
            expect(result.id).toEqual(attributes.id);
            expect(result.path).toEqual(attributes.path);
            expect(result.source).toEqual(attributes.source);
            expect(result.reason).toEqual(attributes.reason);
            expect(result.error).toEqual(undefined);
        });

        it('should return a StoreError object with the expected message', () => {
            const result = createStoreSourceError(attributes);

            expect(result.message()).toContain('Invalid SchemaSource');
            expect(result.message()).toContain('/foo');
            expect(result.message()).toContain('because bar');
            expect(result.message()).toContain('[object]');
            expect(result.message()).toContain('"path": "data/"');
        });
    });
});
