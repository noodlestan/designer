import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type ColorObjectInput } from '../../../../../inputs';
import { createValueContextMock } from '../../../../../mocks';
import { type Color, createColor } from '../../../../primitives';
import { resolveOklabChromaValue } from '../../oklab-chroma-value';
import { resolveOklabHueValue } from '../../oklab-hue-value';
import { resolveOklabLightnessValue } from '../../oklab-lightness-value';
import { resolveSRGBHueValue } from '../../srgb-hue-value';
import { resolveSRGBLightnessValue } from '../../srgb-lightness-value';
import { resolveSRGBSaturationValue } from '../../srgb-saturation-value';

import { FALLBACK_VALUE as fallback, VALUE_NAME as valueName } from './constants';
import { resolveColorObject } from './resolveColorObject';

vi.mock('../../srgb-hue-value');
vi.mock('../../srgb-lightness-value');
vi.mock('../../srgb-saturation-value');
vi.mock('../../oklab-lightness-value');
vi.mock('../../oklab-chroma-value');
vi.mock('../../oklab-hue-value');
vi.mock('../../../../primitives/');

const resolveSRGBHueValueMock = vi.mocked(resolveSRGBHueValue);
const resolveSRGBLightnessValueMock = vi.mocked(resolveSRGBLightnessValue);
const resolveSRGBSaturationValueMock = vi.mocked(resolveSRGBSaturationValue);
const resolveOklabLightnessValueMock = vi.mocked(resolveOklabLightnessValue);
const resolveOklabChromaValueMock = vi.mocked(resolveOklabChromaValue);
const resolveOklabHueValueMock = vi.mocked(resolveOklabHueValue);
const createColorMock = vi.mocked(createColor);

describe('resolveColorObject()', () => {
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input contains sRGB properties', () => {
        const input: ColorObjectInput = { h: 99, s: 99, l: 99 };

        beforeEach(() => {
            resolveSRGBHueValueMock.mockReturnValue(10);
            resolveSRGBSaturationValueMock.mockReturnValue(0.5);
            resolveSRGBLightnessValueMock.mockReturnValue(0.8);
            createColorMock.mockReturnValue({} as Color);
        });

        it('should resolve the hue, saturation, and lightness', () => {
            resolveColorObject(input, mockContext);

            expect(resolveSRGBHueValueMock).toHaveBeenCalledWith(mockContext, input.h);
            expect(resolveSRGBSaturationValueMock).toHaveBeenCalledWith(mockContext, input.s);
            expect(resolveSRGBLightnessValueMock).toHaveBeenCalledWith(mockContext, input.l);
        });

        it('should create a color with the resolved values', () => {
            resolveColorObject(input, mockContext);

            expect(createColorMock).toHaveBeenCalledWith({ h: 10, s: 0.5, l: 0.8 });
        });
    });

    describe('When input contains Oklab (a, b) properties', () => {
        const input: ColorObjectInput = { l: 99, a: 0.2, b: 0.4 };

        beforeEach(() => {
            resolveOklabLightnessValueMock.mockReturnValue(0.9);
            createColorMock.mockReturnValue({} as Color);
        });

        it('should resolve the lightness', () => {
            resolveColorObject(input, mockContext);

            expect(resolveOklabLightnessValueMock).toHaveBeenCalledWith(mockContext, input.l);
        });

        it('should create a color with the resolved lightness and provided a, b values', () => {
            resolveColorObject(input, mockContext);

            expect(createColorMock).toHaveBeenCalledWith({ l: 0.9, a: 0.2, b: 0.4 });
        });
    });

    describe('When input contains Oklab (c, h) properties', () => {
        const input: ColorObjectInput = { l: 99, c: 99, h: 99 };

        beforeEach(() => {
            resolveOklabLightnessValueMock.mockReturnValue(0.9);
            resolveOklabChromaValueMock.mockReturnValue(0.5);
            resolveOklabHueValueMock.mockReturnValue(200);
            createColorMock.mockReturnValue({} as Color);
        });

        it('should resolve the lightness, chroma, and hue', () => {
            resolveColorObject(input, mockContext);

            expect(resolveOklabLightnessValueMock).toHaveBeenCalledWith(mockContext, input.l);
            expect(resolveOklabChromaValueMock).toHaveBeenCalledWith(mockContext, input.c);
            expect(resolveOklabHueValueMock).toHaveBeenCalledWith(mockContext, input.h);
        });

        it('should create a color with the resolved values', () => {
            resolveColorObject(input, mockContext);

            expect(createColorMock).toHaveBeenCalledWith({ l: 0.9, c: 0.5, h: 200 });
        });
    });

    describe('When input is invalid', () => {
        const input = {} as ColorObjectInput;

        it('should add an error to the context', () => {
            resolveColorObject(input, mockContext);

            expect(mockContext.addError).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0];
            expect(error.message()).toContain('Invalid input data');
            expect(error.context).toEqual(mockContext);
            expect(error.valueName).toEqual(valueName);
            expect(error.input).toEqual(input);
        });

        it('should return the fallback value', () => {
            const result = resolveColorObject(input, mockContext);
            expect(result).toEqual(fallback);
        });
    });
});
