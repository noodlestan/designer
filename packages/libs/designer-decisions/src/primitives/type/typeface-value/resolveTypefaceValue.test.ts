import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TypefaceValueAttributesInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';
import { ValueInputError } from '../../../values';
import { Typeface } from '../../types';

import { FALLBACK_VALUE } from './private';
import { resolveTypefaceValue } from './resolveTypefaceValue';
import { resolveTypefaceValueRef } from './resolveTypefaceValueRef';

vi.mock('./resolveTypefaceValueRef');

const resolveTypefaceValueRefMock = vi.mocked(resolveTypefaceValueRef);

describe('resolveTypefaceValue()', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const resolvedValue: Typeface = FALLBACK_VALUE;

        beforeEach(() => {
            resolveTypefaceValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveTypefaceValueRef with the correct arguments', () => {
            resolveTypefaceValue(mockContext, mockInput);

            expect(resolveTypefaceValueRefMock).toHaveBeenCalledOnce();
            expect(resolveTypefaceValueRefMock).toHaveBeenCalledWith(mockContext, mockInput);
        });

        it('should return the value resolved by resolveTypefaceValueRef', () => {
            const result = resolveTypefaceValue(mockContext, mockInput);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const mockInput = {};

        it('should return the fallback value', () => {
            const result = resolveTypefaceValue(mockContext, mockInput);
            expect(result).toEqual(FALLBACK_VALUE);
        });
    });

    describe('When input is an incomplete object', () => {
        const mockInput = {
            fontName: 'Foo',
        };

        it('should return a complete object', () => {
            const result = resolveTypefaceValue(mockContext, mockInput);
            expect(result).toEqual({ ...FALLBACK_VALUE, ...mockInput });
        });
    });

    describe('When input is a complete value', () => {
        const input = {
            fontName: 'Foo',
            source: { type: 'import', value: '@foo/bar/style.css' },
            capabilities: ['variable'],
            styles: [],
            ranges: [],
        } as TypefaceValueAttributesInput;

        it('should expose the resolved value via .get()', () => {
            const result = resolveTypefaceValue(mockContext, input);

            expect(result).toEqual(input);
        });
    });

    describe('When input contains invalid capabilities', () => {
        const invalidInput = {
            fontName: 'Foo',
            capabilities: ['variable', 'foo', 'bar'],
        } as TypefaceValueAttributesInput;

        it('should expose the only the valid capabilities', () => {
            const result = resolveTypefaceValue(mockContext, invalidInput);

            expect(result.capabilities).toEqual(['variable']);

            expect(addErrorSpy).toHaveBeenCalledTimes(2);
            const error1 = addErrorSpy.mock.calls[0][0] as ValueInputError;
            const error2 = addErrorSpy.mock.calls[1][0] as ValueInputError;
            expect(error1.message()).toContain('Unsupported capability');
            expect(error1.message()).toContain('foo');
            expect(error1.input).toEqual('foo');
            expect(error2.message()).toContain('bar');
        });
    });
});
