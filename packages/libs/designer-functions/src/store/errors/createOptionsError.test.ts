import { describe, expect, it } from 'vitest';

import { ERROR_STORE_OPTIONS } from './constants';
import { createOptionsError } from './createOptionsError';

describe('createOptionsError()', () => {
    describe('Given error attributes', () => {
        const attributes = {
            path: '/foo',
            reason: 'because bar',
            options: { baz: 'qux' },
        };

        it('should return a StoreError object with the expected name', () => {
            const result = createOptionsError(attributes);

            expect(result.name).toEqual(ERROR_STORE_OPTIONS);
        });

        it('should return a StoreError object with the expected attributes', () => {
            const result = createOptionsError(attributes);

            expect(result.path).toEqual(attributes.path);
            expect(result.reason).toEqual(attributes.reason);
            expect(result.options).toEqual(attributes.options);
            expect(result.error).toEqual(undefined);
        });

        it('should return a StoreError object with the expected message', () => {
            const result = createOptionsError(attributes);

            expect(result.message()).toContain('Invalid StoreOptions');
            expect(result.message()).toContain('/foo');
            expect(result.message()).toContain('because bar');
            expect(result.message()).toContain('[object]');
            expect(result.message()).toContain('"baz": "qux"');
        });
    });
});
