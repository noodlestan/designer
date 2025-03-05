import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';

import { createBaseSet } from './createBaseSet';

describe('createBaseSet()', () => {
    describe('Given a context', () => {
        const [mockValueContext] = createValueContextMock();
        const mockInput = ['foo', 'bar'];

        it('should return a value with the provided context', () => {
            const result = createBaseSet(mockValueContext, mockInput);
            expect(result.context()).toBe(mockValueContext);
        });

        it('should expose the ItemSet via .get()', () => {
            const result = createBaseSet(mockValueContext, mockInput);

            expect(result.get().items()).toHaveLength(2);
            expect(result.get().item(0)).toEqual('foo');
        });
    });
});
