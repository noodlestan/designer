import { beforeEach, describe, expect, it } from 'vitest';

import { createStoreContext } from './createStoreContext';

import type { StoreOptions, StoreOptionsError } from '.';

describe('createStoreContext()', () => {
    const options: StoreOptions = { decisions: [], schemas: [] };

    describe('Given options', () => {
        it('should create expose the options', () => {
            const result = createStoreContext(options);

            expect(result.options()).toEqual(options);
        });
    });
    describe('Given no options', () => {
        it('should throw an error when calling options()', () => {
            const result = createStoreContext();

            expect(() => result.options()).toThrowError('No options in context.');
        });
    });

    describe('Given a an array of inputs', () => {
        it('should create a context with no errors', () => {
            const result = createStoreContext();

            expect(result.errors()).toEqual([]);
            expect(result.hasErrors()).toBe(false);
        });
    });

    describe('When addError() is called', () => {
        const mockError = {} as StoreOptionsError;

        const context = createStoreContext();

        beforeEach(() => {
            context.addError(mockError);
        });

        it('should add the error to the context', () => {
            expect(context.errors()).toEqual([mockError]);
            expect(context.hasErrors()).toBe(true);
        });
    });

    describe('When addError() is called multiple times', () => {
        const mockError1 = {} as StoreOptionsError;
        const mockError2 = {} as StoreOptionsError;

        const context = createStoreContext();

        beforeEach(() => {
            context.addError(mockError1);
            context.addError(mockError2);
        });

        it('should add all errors to the context', () => {
            expect(context.errors()).toEqual([mockError1, mockError2]);
            expect(context.hasErrors()).toBe(true);
        });
    });
});
