import { describe, expect, it } from 'vitest';

import { ERROR_STORE_SCHEMA } from './constants';
import { createStoreSchemaError } from './createStoreSchemaError';

describe('createStoreSchemaError()', () => {
    describe('Given an id and a reason', () => {
        const attributes = {
            id: '123',
            reason: 'because bar',
        };

        it('should return a StoreError object with the expected name', () => {
            const result = createStoreSchemaError(attributes);

            expect(result.name).toEqual(ERROR_STORE_SCHEMA);
        });

        it('should return a StoreError object with the expected attributes', () => {
            const result = createStoreSchemaError(attributes);

            expect(result.id).toEqual(attributes.id);
            expect(result.reason).toEqual(attributes.reason);
        });

        it('should return a StoreError object with the expected message', () => {
            const result = createStoreSchemaError(attributes);

            expect(result.message()).toContain('Invalid schema');
            expect(result.message()).toContain('because bar');
        });
    });
});
