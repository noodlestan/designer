import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ValueContext } from '../../../value';

import { createBaseValue } from './createBaseValue';

describe('createBaseValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a context', () => {
        const mockValueContext = {} as unknown as ValueContext;
        const mockPrimitive = { foo: 'Bar', bar: () => 'Foo' };
        const mockGet = vi.fn().mockReturnValue(mockPrimitive);

        it('should have called the getter', () => {
            createBaseValue(mockValueContext, mockGet);
            expect(mockGet).to.toHaveBeenCalledOnce();
        });

        it('should expose the primitive attributes and methods', () => {
            const mockPrimitive = createBaseValue(mockValueContext, mockGet);
            expect(mockPrimitive.foo).to.equal('Bar');
            expect(mockPrimitive.bar()).to.equal('Foo');
        });
    });

    describe('When get is called', () => {
        const mockValueContext = {} as unknown as ValueContext;
        const mockValue = { foo: 'Bar' };
        const mockGet = vi.fn().mockReturnValue(mockValue);

        it('should have called the getter only once', () => {
            createBaseValue(mockValueContext, mockGet);

            expect(mockGet).to.toHaveBeenCalledOnce();
        });

        it('should return the value', () => {
            const mockPrimitive = createBaseValue(mockValueContext, mockGet);
            expect(mockPrimitive.get()).toEqual(mockValue);
        });
    });

    describe('When context() is called', () => {
        const mockValueContext = {} as unknown as ValueContext;
        const mockValue = { foo: 'Bar' };
        const mockGet = vi.fn().mockReturnValue(mockValue);

        it('should return a value with the provided context', () => {
            const mockPrimitive = createBaseValue(mockValueContext, mockGet);
            expect(mockPrimitive.context()).toEqual(mockValueContext);
        });
    });

    describe('When get or context are called multiple times', () => {
        const mockValueContext = {} as unknown as ValueContext;
        const mockValue = { foo: 'Bar' };
        const mockGet = vi.fn().mockReturnValue(mockValue);

        it('should have called the getter only once', () => {
            const mockPrimitive = createBaseValue(mockValueContext, mockGet);
            mockPrimitive.context();
            mockPrimitive.context();
            mockPrimitive.get();
            mockPrimitive.get();
            expect(mockGet).to.toHaveBeenCalledTimes(1);
        });
    });
});
