import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';

import { createBaseSet } from './createBaseSet';

describe('createBaseSet()', () => {
    describe('Given a context', () => {
        const mockInput = ['foo', 'bar', 'baz'];
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return a value with the provided context', () => {
            const result = createBaseSet(mockValueContext);
            expect(result.context()).toBe(mockValueContext);
        });

        it('should expose the ItemSet via .get()', () => {
            const result = createBaseSet(mockValueContext);

            expect(result.get().items()).toHaveLength(3);
            expect(result.get().first()).toEqual('foo');
            expect(result.get().item(1)).toEqual('bar');
            expect(result.get().last()).toEqual('baz');
        });

        it('should expose the ItemSet methods', () => {
            const result = createBaseSet(mockValueContext);

            expect(result.items()).toHaveLength(3);
            expect(result.first()).toEqual('foo');
            expect(result.item(1)).toEqual('bar');
            expect(result.last()).toEqual('baz');
        });
    });
});
