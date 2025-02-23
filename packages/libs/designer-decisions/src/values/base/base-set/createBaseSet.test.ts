import { describe, expect, it, vi } from 'vitest';

import type { ValueContext } from '../../../value';

import { createBaseSet } from './createBaseSet';

describe('createBaseSet()', () => {
    describe('Given a context', () => {
        const mockContext = {
            consume: vi.fn(),
        } as unknown as ValueContext;
        const mockInput = ['foo', 'bar'];

        it('should return a value with the provided context', () => {
            const result = createBaseSet(mockContext, mockInput);
            expect(result.context()).toBe(mockContext);
        });

        it('should expose the ItemSet via .get()', () => {
            const result = createBaseSet(mockContext, mockInput);

            expect(result.get().items()).toHaveLength(2);
            expect(result.get().item(0)).toEqual('foo');
        });
    });
});
