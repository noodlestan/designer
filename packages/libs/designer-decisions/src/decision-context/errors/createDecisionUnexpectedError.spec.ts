import { describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../mocks';
import { UnknownDecisionModelError } from '../../store/errors/UnknownDecisionModelError';
import { UnknownDecisionTypeError } from '../../store/errors/UnknownDecisionTypeError';
import { ERROR_DECISION_UNEXPECTED, ERROR_LAYER_DECISION } from '../constants';

import { createDecisionUnexpectedError } from './createDecisionUnexpectedError';

describe('createDecisionUnexpectedError()', () => {
    const [mockDecisionContext] = createDecisionContextMock();

    describe('Given a context and an error', () => {
        const mockError = new Error('Test error');

        it('should return a DecisionError object with the expected attributes', () => {
            const result = createDecisionUnexpectedError({
                context: mockDecisionContext,
                error: mockError,
            });
            expect(result.layer).toEqual(ERROR_LAYER_DECISION);
            expect(result.name).toEqual(ERROR_DECISION_UNEXPECTED);
            expect(result.context).toEqual(mockDecisionContext);
            expect(result.error).toEqual(mockError);
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createDecisionUnexpectedError({
                context: mockDecisionContext,
                error: mockError,
            });
            expect(result.message()).toContain('Unexpected Decision Error');
            expect(result.message()).toContain('test-uuid');
            expect(result.message()).toContain('Test error');
        });
    });

    describe('Given a context and no error', () => {
        it('should return a DecisionError object with no error object', () => {
            const result = createDecisionUnexpectedError({ context: mockDecisionContext });
            expect(result.error).toBeUndefined();
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createDecisionUnexpectedError({ context: mockDecisionContext });
            expect(result.message()).toContain('Unexpected Decision Error');
            expect(result.message()).toContain('test-uuid');
        });
    });

    describe('Given a context and a UnknownDecisionTypeError error', () => {
        const error = new UnknownDecisionTypeError('unknown-type');

        it('should return a DecisionError object with no error object', () => {
            const result = createDecisionUnexpectedError({ context: mockDecisionContext, error });
            expect(result.error).toBeUndefined();
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createDecisionUnexpectedError({ context: mockDecisionContext, error });
            expect(result.message()).toContain('Unknown Decision Type "unknown-type".');
            expect(result.message()).toContain('unknown-type');
        });
    });

    describe('Given a context and a UnknownDecisionTypeError error', () => {
        const error = new UnknownDecisionModelError('unknown-model');

        it('should return a DecisionError object with no error object', () => {
            const result = createDecisionUnexpectedError({ context: mockDecisionContext, error });
            expect(result.error).toBeUndefined();
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createDecisionUnexpectedError({ context: mockDecisionContext, error });
            expect(result.message()).toContain('Unknown Decision Model "unknown-model".');
            expect(result.message()).toContain('unknown-model');
        });
    });
});
