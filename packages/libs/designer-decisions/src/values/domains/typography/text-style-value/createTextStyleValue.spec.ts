import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type TextStyleInput, type TextStyleObjectInput } from '../../../../inputs';
import { createPrimitiveContextMock, createValueContextMock } from '../../../../mocks';
import { type TextStyleAttributes, createTextStyleAttributes } from '../../../../primitives';
import { createFontFamilyValue } from '../font-family-value';
import { createFontSizeValue } from '../font-size-value';
import { createFontWeightValue } from '../font-weight-value';
import { createLetterSpacingValue } from '../letter-spacing-value';
import { createLineHeightValue } from '../line-height-value';
import type {
    FontFamilyValue,
    FontSizeValue,
    FontWeightValue,
    LetterSpacingValue,
    LineHeightValue,
} from '../types';

import { createTextStyleValue } from './createTextStyleValue';
import { createExtendedTextStyleValue } from './private';
import { resolveTextStyleValue } from './resolveTextStyleValue';

vi.mock('../font-family-value');
vi.mock('../font-size-value');
vi.mock('../font-weight-value');
vi.mock('../letter-spacing-value');
vi.mock('../line-height-value');
vi.mock('./private');
vi.mock('./resolveTextStyleValue');
vi.mock('../../../../primitives');

const createFontFamilyValueMocked = vi.mocked(createFontFamilyValue);
const createFontSizeValueMocked = vi.mocked(createFontSizeValue);
const createFontWeightValueMocked = vi.mocked(createFontWeightValue);
const createLetterSpacingValueMocked = vi.mocked(createLetterSpacingValue);
const createLineHeightValueMocked = vi.mocked(createLineHeightValue);
const resolveTextStyleValueMocked = vi.mocked(resolveTextStyleValue);
const createTextStyleAttributesMocked = vi.mocked(createTextStyleAttributes);
const createExtendedTextStyleValueMocked = vi.mocked(createExtendedTextStyleValue);

describe('createTextStyleValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Given a context and an input without an "extend"', () => {
        const mockInput = { $name: 'Foo' } as TextStyleInput;
        const [mockValueContext, { forPrimitiveSpy, forChildValueSpy }] =
            createValueContextMock(mockInput);

        const mockResolvedInput = {
            fontFamily: 'Georgia',
            fontSize: '20px',
            fontWeight: 'Bold',
            lineHeight: 1.5,
            letterSpacing: '1.01rem',
            textTransform: 'uppercase',
            fontStyle: 'italic',
        } as TextStyleObjectInput;
        const mockAttributes = {
            textTransform: 'uppercase',
            fontStyle: 'italic',
            toString: () => 'italic uppercase',
        } as TextStyleAttributes;

        const [mockPrimitiveContext] = createPrimitiveContextMock();
        const [mockChildContext] = createValueContextMock();

        const mockFontFamilyValue = { fontName: 'Georgia' } as FontFamilyValue;
        const mockFontSizeValue = { toString: () => '20px' } as FontSizeValue;
        const mockFontWeightValue = { toString: () => 'Bold' } as FontWeightValue;
        const mockLineHeightValue = { toString: () => '1.5' } as LineHeightValue;
        const mockLetterSpacingValue = { toString: () => '1.01rem' } as LetterSpacingValue;

        beforeEach(() => {
            resolveTextStyleValueMocked.mockReturnValue(mockResolvedInput);
            forPrimitiveSpy.mockReturnValue(mockPrimitiveContext);
            createTextStyleAttributesMocked.mockReturnValue(mockAttributes);
            createExtendedTextStyleValueMocked.mockReturnValue(undefined);
            forChildValueSpy.mockReturnValue(mockChildContext);
            createFontFamilyValueMocked.mockReturnValue(mockFontFamilyValue);
            createFontSizeValueMocked.mockReturnValue(mockFontSizeValue);
            createFontWeightValueMocked.mockReturnValue(mockFontWeightValue);
            createLetterSpacingValueMocked.mockReturnValue(mockLetterSpacingValue);
            createLineHeightValueMocked.mockReturnValue(mockLineHeightValue);
        });

        it('should return a TextStyleValue with the provided context', () => {
            const result = createTextStyleValue(mockValueContext);
            expect(result.context()).toEqual(mockValueContext);
        });

        it('should return a TextStyleValue with the composite attributes', () => {
            const result = createTextStyleValue(mockValueContext);
            expect(result.fontFamily).toBe(mockFontFamilyValue);
            expect(result.fontSize).toBe(mockFontSizeValue);
            expect(result.fontWeight).toBe(mockFontWeightValue);
            expect(result.lineHeight).toBe(mockLineHeightValue);
            expect(result.letterSpacing).toBe(mockLetterSpacingValue);
            expect(result.textTransform).toBe(mockResolvedInput.textTransform);
            expect(result.fontStyle).toBe(mockResolvedInput.fontStyle);
        });

        it('should expose a string with all the styles', () => {
            const result = createTextStyleValue(mockValueContext);
            expect(result.toString()).toEqual(
                'Georgia / Bold / 20px / height: 1.5 / italic uppercase / spacing: 1.01rem',
            );
        });

        it('should call resolveTextStyleValue() with the expected arguments', () => {
            createTextStyleValue(mockValueContext);
            expect(resolveTextStyleValueMocked).toHaveBeenCalledWith(mockValueContext);
        });

        it('should call forPrimitive() with the resolved input', () => {
            createTextStyleValue(mockValueContext);
            expect(forPrimitiveSpy).toHaveBeenCalledWith(mockResolvedInput);
        });

        it('should call createTextStyleAttributes() with the resolved input', () => {
            createTextStyleValue(mockValueContext);
            expect(createTextStyleAttributesMocked).toHaveBeenCalledWith(mockPrimitiveContext);
        });

        it('should call forChildValue() value factories with a child context', () => {
            createTextStyleValue(mockValueContext);
            expect(forChildValueSpy).toHaveBeenCalledTimes(5);
            expect(forChildValueSpy).toHaveBeenCalledWith(mockResolvedInput.fontFamily);
            expect(forChildValueSpy).toHaveBeenCalledWith(mockResolvedInput.fontSize);
            expect(forChildValueSpy).toHaveBeenCalledWith(mockResolvedInput.fontWeight);
            expect(forChildValueSpy).toHaveBeenCalledWith(mockResolvedInput.lineHeight);
            expect(forChildValueSpy).toHaveBeenCalledWith(mockResolvedInput.letterSpacing);
        });

        it('should call the composite value factories with a child context', () => {
            createTextStyleValue(mockValueContext);
            expect(createFontFamilyValueMocked).toHaveBeenCalledWith(mockChildContext);
            expect(createFontSizeValueMocked).toHaveBeenCalledWith(mockChildContext);
            expect(createFontWeightValueMocked).toHaveBeenCalledWith(mockChildContext);
            expect(createLineHeightValueMocked).toHaveBeenCalledWith(mockChildContext);
            expect(createLetterSpacingValueMocked).toHaveBeenCalledWith(mockChildContext);
        });

        describe('when get() is called', () => {
            it('should return the created TextStyle composite', () => {
                const result = createTextStyleValue(mockValueContext);
                expect(result.get().fontFamily).toBe(mockFontFamilyValue);
            });
        });
    });
});
