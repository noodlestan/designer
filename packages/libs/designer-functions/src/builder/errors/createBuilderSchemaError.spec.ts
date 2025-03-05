import { describe, expect, it } from 'vitest';

import { ERROR_BUILDER_SCHEMA } from './constants';
import { createBuilderSchemaError } from './createBuilderSchemaError';

describe('createBuilderSchemaError()', () => {
    describe('Given an id and a reason', () => {
        const attributes = {
            id: '123',
            reason: 'because bar',
        };

        it('should return a BuilderError object with the expected name', () => {
            const result = createBuilderSchemaError(attributes);

            expect(result.name).toEqual(ERROR_BUILDER_SCHEMA);
        });

        it('should return a BuilderError object with the expected attributes', () => {
            const result = createBuilderSchemaError(attributes);

            expect(result.id).toEqual(attributes.id);
            expect(result.reason).toEqual(attributes.reason);
        });

        it('should return a BuilderError object with the expected message', () => {
            const result = createBuilderSchemaError(attributes);

            expect(result.message()).toContain('Invalid schema');
            expect(result.message()).toContain('because bar');
        });
    });
});
