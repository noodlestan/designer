import { beforeEach, describe, expect, it } from 'vitest';

import { createBuilderContext } from './createBuilderContext';
import type { BuilderOptions, BuilderOptionsError } from './types';

describe('createBuilderContext()', () => {
    const options: BuilderOptions = { decisions: [], schemas: [] };

    describe('Given options', () => {
        it('should create expose the options', () => {
            const result = createBuilderContext(options);

            expect(result.options()).toEqual(options);
        });
    });
    describe('Given no options', () => {
        it('should throw an error when calling options()', () => {
            const result = createBuilderContext();

            expect(() => result.options()).toThrowError('No options in context.');
        });
    });

    describe('Given a an array of inputs', () => {
        it('should create a context with no errors', () => {
            const result = createBuilderContext();

            expect(result.errors()).toEqual([]);
            expect(result.hasErrors()).toBe(false);
        });
    });

    describe('When addError() is called', () => {
        const mockError = {} as BuilderOptionsError;

        const context = createBuilderContext();

        beforeEach(() => {
            context.addError(mockError);
        });

        it('should add the error to the context', () => {
            expect(context.errors()).toEqual([mockError]);
            expect(context.hasErrors()).toBe(true);
        });
    });

    describe('When addError() is called multiple times', () => {
        const mockError1 = {} as BuilderOptionsError;
        const mockError2 = {} as BuilderOptionsError;

        const context = createBuilderContext();

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
