import { beforeEach, describe, expect, it, vi } from 'vitest';

import type {
    DecisionContext,
    DecisionError,
    DecisionInputBase,
    DecisionRef,
    DecisionRefResolver,
} from '../types';

import { createDecisionContext } from './createDecisionContext';

describe('createDecisionContext()', () => {
    const mockRef: DecisionRef = { $uuid: 'decision-1' };
    const mockResolver: DecisionRefResolver = vi.fn();
    const mockInputs: DecisionInputBase[] = [{ model: 'model', name: 'value-1', params: {} }];

    describe('Given a an array of inputs', () => {
        let result: DecisionContext;

        beforeEach(() => {
            result = createDecisionContext(mockRef, mockResolver, mockInputs);
        });

        it('should create a context with the expected ref, resolver, and inputs', () => {
            expect(result.ref()).toBe(mockRef);
            expect(result.resolve).toBe(mockResolver);
            expect(result.inputs()).toEqual(mockInputs);
        });

        it('should create a context with no errors', () => {
            expect(result.errors()).toEqual([]);
            expect(result.hasErrors()).toBe(false);
        });
    });

    describe('When addError() is called', () => {
        const error1: DecisionError = { msg: 'Error 1' };

        let result: DecisionContext;

        beforeEach(() => {
            result = createDecisionContext(mockRef, mockResolver, mockInputs);
            result.addError(error1);
        });

        it('should add the error to the context', () => {
            expect(result.errors()).toEqual([error1]);
            expect(result.hasErrors()).toBe(true);
        });
    });

    describe('When addError() is called multiple times', () => {
        const error1: DecisionError = { msg: 'Error 1' };
        const error2: DecisionError = { msg: 'Error 2' };

        let result: DecisionContext;

        beforeEach(() => {
            result = createDecisionContext(mockRef, mockResolver, mockInputs);
            result.addError(error1);
            result.addError(error2);
        });

        it('should add all errors to the context', () => {
            expect(result.errors()).toEqual([error1, error2]);
            expect(result.hasErrors()).toBe(true);
        });
    });
});
