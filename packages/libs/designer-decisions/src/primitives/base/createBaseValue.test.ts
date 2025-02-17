import { describe, expect, it } from 'vitest';

import { type ValueContext } from '../../values';

import { createBaseValue } from './createBaseValue';

describe('createBaseValue()', () => {
    describe('Given a context', () => {
        const mockContext = {} as ValueContext;

        it('should return a value with the provided context', () => {
            const result = createBaseValue(mockContext);
            expect(result.context()).toBe(mockContext);
        });
    });
});
