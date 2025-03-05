import { describe, expect, it, vi } from 'vitest';

import type { ValueContext } from '../../../value';

import { createBaseValue } from './createBaseValue';

describe('createBaseValue()', () => {
    describe('Given a context', () => {
        const mockValueContext = {} as unknown as ValueContext;
        const mockValue = 'Foo Bar';
        const mockGet = vi.fn().mockReturnValue(mockValue);

        it('should Not have called the getter', () => {
            createBaseValue(mockValueContext, mockGet);
            expect(mockGet).to.not.toHaveBeenCalled();
        });
    });

    describe('When get is called', () => {
        const mockValueContext = {} as unknown as ValueContext;
        const mockValue = 'Foo Bar';
        const mockGet = vi.fn().mockReturnValue(mockValue);

        it('should have called the getter', () => {
            const baseValue = createBaseValue(mockValueContext, mockGet);
            baseValue.get();

            expect(mockGet).to.toHaveBeenCalledOnce();
        });

        it('should return the value', () => {
            const baseValue = createBaseValue(mockValueContext, mockGet);
            expect(baseValue.get()).toEqual(mockValue);
        });
    });

    describe('When context() is called', () => {
        const mockValueContext = {} as unknown as ValueContext;
        const mockValue = 'Foo Bar';
        const mockGet = vi.fn().mockReturnValue(mockValue);

        it('should have called the getter', () => {
            const baseValue = createBaseValue(mockValueContext, mockGet);
            baseValue.get();

            expect(mockGet).to.toHaveBeenCalledOnce();
        });

        it('should return a value with the provided context', () => {
            const baseValue = createBaseValue(mockValueContext, mockGet);
            expect(baseValue.context()).toEqual(mockValueContext);
        });
    });

    describe('When get or context are called multiple times', () => {
        const mockValueContext = {} as unknown as ValueContext;
        const mockValue = 'Foo Bar';
        const mockGet = vi.fn().mockReturnValue(mockValue);

        it('should have called the getter only once', () => {
            const baseValue = createBaseValue(mockValueContext, mockGet);
            baseValue.context();
            baseValue.context();
            baseValue.get();
            baseValue.get();
            expect(mockGet).to.toHaveBeenCalledTimes(1);
        });
    });
});
