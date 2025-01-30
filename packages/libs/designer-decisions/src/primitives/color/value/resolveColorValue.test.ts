import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorValueInput } from '../../../types';
import { createColor } from '../helpers';

import { FALLBACK_VALUE, VALUE_NAME, resolveColorObject } from './private';
import { resolveColorValue } from './resolveColorValue';
import { resolveColorValueRef } from './resolveColorValueRef';

vi.mock('./private', () => ({
    resolveColorObject: vi.fn(),
    FALLBACK_VALUE: 'mocked',
    VALUE_NAME: 'mocked',
}));

vi.mock('./resolveColorValueRef');

const resolveColorValueRefMock = vi.mocked(resolveColorValueRef);
const resolveColorObjectMock = vi.mocked(resolveColorObject);

describe('resolveColorValue()', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const colorLiteral = { h: 300, s: 0.6, l: 0.4 };
        const resolvedValue = createColor(colorLiteral);

        beforeEach(() => {
            resolveColorValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveColorValueRef with the correct arguments', () => {
            resolveColorValue(mockContext, mockInput);

            expect(resolveColorValueRefMock).toHaveBeenCalledOnce();
            expect(resolveColorValueRefMock).toHaveBeenCalledWith(mockContext, mockInput);
        });

        it('should return the value resolved by resolveColorValueRef', () => {
            const result = resolveColorValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a ColorObject', () => {
        const mockInput = { h: 300, s: 0.6, l: 0.4 };
        const resolvedValue = createColor(mockInput);

        beforeEach(() => {
            resolveColorObjectMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveColorObject with the correct arguments', () => {
            resolveColorValue(mockContext, mockInput);

            expect(resolveColorObjectMock).toHaveBeenCalledOnce();
            expect(resolveColorObjectMock).toHaveBeenCalledWith(mockInput, mockContext);
        });

        it('should return the value resolved by resolveColorObject', () => {
            const result = resolveColorValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is a string', () => {
        const mockInput = 'hsl(240deg 50% 50%)';
        const resolvedValue = createColor(mockInput);

        it('should return the value created by createColor', () => {
            const result = resolveColorValue(mockContext, mockInput);
            expect(result.toString('hsl')).toEqual(resolvedValue.toString('hsl'));
        });

        it('should not add an error to the context', () => {
            resolveColorValue(mockContext, mockInput);
            expect(addErrorSpy).not.toHaveBeenCalled();
        });
    });

    describe('When input is a number', () => {
        const mockInput = 8737115;
        const resolvedValue = createColor(mockInput);

        it('should return the value created by createColor', () => {
            const result = resolveColorValue(mockContext, mockInput);
            expect(result.toString('hsl')).toEqual(resolvedValue.toString('hsl'));
        });

        it('should not add an error to the context', () => {
            resolveColorValue(mockContext, mockInput);
            expect(addErrorSpy).not.toHaveBeenCalled();
        });
    });

    describe('When input is invalid', () => {
        const mockInput: unknown = true;

        it('should add an error to the context', () => {
            resolveColorValue(mockContext, mockInput as ColorValueInput);

            expect(addErrorSpy).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0];
            expect(error.message()).toContain('Invalid input data for');
            expect(error.context).toBe(mockContext);
            expect(error.valueName).toBe(VALUE_NAME);
            expect(error.input).toBe(mockInput);
        });

        it('should return the fallback value', () => {
            const result = resolveColorValue(mockContext, mockInput as ColorValueInput);

            expect(result).toEqual(FALLBACK_VALUE);
        });
    });
});
