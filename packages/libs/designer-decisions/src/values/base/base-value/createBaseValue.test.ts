import { describe, expect, it, vi } from 'vitest';

import type { ValueContext } from '../../../value';

import { createBaseValue } from './createBaseValue';

describe('createBaseValue()', () => {
    describe('Given a context', () => {
        const mockContext = {
            consume: vi.fn(),
        } as unknown as ValueContext;
        const mockInput = { value: 'foo' };

        it('should return a value with the provided context', () => {
            const result = createBaseValue(mockContext, mockInput);
            expect(result.context()).toBe(mockContext);
        });

        it('should call context.consume()', () => {
            createBaseValue(mockContext, mockInput);
            expect(mockContext.consume).toHaveBeenCalledWith(mockInput);
        });
    });
});
