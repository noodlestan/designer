import { describe, expect, it } from 'vitest';

import { ERROR_BUILDER_OPTIONS } from './constants';
import { createBuilderOptionsError } from './createBuilderOptionsError';

describe('createBuilderOptionsError()', () => {
    describe('Given error attributes', () => {
        const attributes = {
            path: '/foo',
            reason: 'because bar',
            options: { baz: 'qux' },
        };

        it('should return a BuilderError object with the expected name', () => {
            const result = createBuilderOptionsError(attributes);

            expect(result.name).toEqual(ERROR_BUILDER_OPTIONS);
        });

        it('should return a BuilderError object with the expected attributes', () => {
            const result = createBuilderOptionsError(attributes);

            expect(result.path).toEqual(attributes.path);
            expect(result.reason).toEqual(attributes.reason);
            expect(result.options).toEqual(attributes.options);
            expect(result.error).toEqual(undefined);
        });

        it('should return a BuilderError object with the expected message', () => {
            const result = createBuilderOptionsError(attributes);

            expect(result.message()).toContain('Invalid BuilderOptions');
            expect(result.message()).toContain('/foo');
            expect(result.message()).toContain('because bar');
            expect(result.message()).toContain('[object]');
            expect(result.message()).toContain('"baz": "qux"');
        });
    });
});
