import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionInput, DecisionRef } from '../inputs';
import type { DecisionSource } from '../record';

import { createDecisionContext } from './createDecisionContext';
import type { DecisionContext, DecisionError, DecisionRefResolver } from './types';

describe('createDecisionContext()', () => {
    const mockRef: DecisionRef = { $uuid: 'decision-1' };
    const mockResolver: DecisionRefResolver = vi.fn();
    const mockInputs: DecisionInput[] = [{ model: 'foo/bar', name: 'value-1', params: {} }];
    const mockRecords = mockInputs.map((input, index) => ({
        uuid: `${index}`,
        input,
        source: {} as DecisionSource,
        loaded: input,
        errors: [],
    }));

    describe('Given a an array of inputs', () => {
        it('should create a context with the expected decisionType, ref, resolver, and inputs', () => {
            const result = createDecisionContext(mockRef, mockResolver, mockRecords);
            expect(result.decisionType()).toBe('foo');
            expect(result.ref()).toBe(mockRef);
            expect(result.resolve).toBe(mockResolver);
            expect(result.records()).toEqual(mockRecords);
        });

        it('should create a context with no errors', () => {
            const result = createDecisionContext(mockRef, mockResolver, mockRecords);
            expect(result.errors()).toEqual([]);
            expect(result.hasErrors()).toBe(false);
        });
    });

    describe('When addError() is called', () => {
        const mockError = {} as DecisionError;
        mockError.context = {} as DecisionContext;

        const context = createDecisionContext(mockRef, mockResolver, mockRecords);

        beforeEach(() => {
            context.addError(mockError);
        });

        it('should add the error to the context', () => {
            expect(context.errors()).toEqual([mockError]);
            expect(context.hasErrors()).toBe(true);
        });
    });

    describe('When addError() is called multiple times', () => {
        const mockError1 = {} as DecisionError;
        mockError1.context = {} as DecisionContext;
        const mockError2 = {} as DecisionError;

        const context = createDecisionContext(mockRef, mockResolver, mockRecords);

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
