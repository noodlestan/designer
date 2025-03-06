import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DECISION_COLOR_VALUE as valueName } from '../../../../../constants';
import { type ColorObjectInput } from '../../../../../inputs';
import { createValueContextMock } from '../../../../../mocks';
import { COLOR_FALLBACK_LITERAL, type Color, createColor } from '../../../../../primitives';
import { resolveOklabChromaValue } from '../../oklab-chroma-value';
import { resolveOklabHueValue } from '../../oklab-hue-value';
import { resolveOklabLightnessValue } from '../../oklab-lightness-value';
import { resolveSRGBHueValue } from '../../srgb-hue-value';
import { resolveSRGBLightnessValue } from '../../srgb-lightness-value';
import { resolveSRGBSaturationValue } from '../../srgb-saturation-value';

import { resolveColorObject } from './resolveColorObject';

vi.mock('../../srgb-hue-value');
vi.mock('../../srgb-lightness-value');
vi.mock('../../srgb-saturation-value');
vi.mock('../../oklab-lightness-value');
vi.mock('../../oklab-chroma-value');
vi.mock('../../oklab-hue-value');
vi.mock('../../../../../primitives');

const resolveSRGBHueValueMock = vi.mocked(resolveSRGBHueValue);
const resolveSRGBLightnessValueMock = vi.mocked(resolveSRGBLightnessValue);
const resolveSRGBSaturationValueMock = vi.mocked(resolveSRGBSaturationValue);
const resolveOklabLightnessValueMock = vi.mocked(resolveOklabLightnessValue);
const resolveOklabChromaValueMock = vi.mocked(resolveOklabChromaValue);
const resolveOklabHueValueMock = vi.mocked(resolveOklabHueValue);
const createColorMock = vi.mocked(createColor);

describe('resolveColorObject()', () => {
    const fallbackColor = COLOR_FALLBACK_LITERAL;
    const [mockContext, { addErrorSpy }] = createValueContextMock();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input contains sRGB properties', () => {
        const input: ColorObjectInput = { h: 99, s: 99, l: 99 };

        const mockColor = {} as Color;

        beforeEach(() => {
            resolveSRGBHueValueMock.mockReturnValue(10);
            resolveSRGBSaturationValueMock.mockReturnValue(0.5);
            resolveSRGBLightnessValueMock.mockReturnValue(0.8);
            createColorMock.mockReturnValue(mockColor);
        });

        it('should resolve the hue, saturation, and lightness', () => {
            resolveColorObject(mockContext, input);
            expect(resolveSRGBHueValueMock).toHaveBeenCalled();
            expect(resolveSRGBSaturationValueMock).toHaveBeenCalled();
            expect(resolveSRGBLightnessValueMock).toHaveBeenCalled();

            const hValueContext = resolveSRGBHueValueMock.mock.calls[0][0];
            expect(hValueContext.input()).toEqual(input.h);

            const sValueContext = resolveSRGBSaturationValueMock.mock.calls[0][0];
            expect(sValueContext.input()).toEqual(input.s);

            const lValueContext = resolveSRGBLightnessValueMock.mock.calls[0][0];
            expect(lValueContext.input()).toEqual(input.l);
        });

        it('should create a color with the resolved values', () => {
            resolveColorObject(mockContext, input);
            expect(createColorMock).toHaveBeenCalled();

            const colorValueContext = createColorMock.mock.calls[0][0];
            expect(colorValueContext.input()).toEqual({ h: 10, s: 0.5, l: 0.8 });
        });

        it('should return the created color', () => {
            const result = resolveColorObject(mockContext, input);
            expect(result).toBe(mockColor);
        });
    });

    describe('When input contains Oklab (a, b) properties', () => {
        const input: ColorObjectInput = { l: 99, a: 0.2, b: 0.4 };

        const mockColor = {} as Color;

        beforeEach(() => {
            resolveOklabLightnessValueMock.mockReturnValue(0.9);
            createColorMock.mockReturnValue(mockColor);
        });

        it('should resolve the lightness', () => {
            resolveColorObject(mockContext, input);
            expect(resolveOklabLightnessValueMock).toHaveBeenCalled();

            const lValueContext = resolveOklabLightnessValueMock.mock.calls[0][0];
            expect(lValueContext.input()).toEqual(input.l);
        });

        it('should create a color with the resolved lightness and provided a, b values', () => {
            resolveColorObject(mockContext, input);
            expect(createColorMock).toHaveBeenCalled();

            const colorValueContext = createColorMock.mock.calls[0][0];
            expect(colorValueContext.input()).toEqual({ l: 0.9, a: 0.2, b: 0.4 });
        });

        it('should return the created color', () => {
            const result = resolveColorObject(mockContext, input);
            expect(result).toBe(mockColor);
        });
    });

    describe('When input contains Oklab (c, h) properties', () => {
        const input: ColorObjectInput = { l: 99, c: 99, h: 99 };

        const mockColor = {} as Color;

        beforeEach(() => {
            resolveOklabLightnessValueMock.mockReturnValue(0.9);
            resolveOklabChromaValueMock.mockReturnValue(0.5);
            resolveOklabHueValueMock.mockReturnValue(200);
            createColorMock.mockReturnValue(mockColor);
        });

        it('should resolve the lightness, chroma, and hue', () => {
            resolveColorObject(mockContext, input);
            expect(resolveOklabLightnessValueMock).toHaveBeenCalled();
            expect(resolveOklabChromaValueMock).toHaveBeenCalled();
            expect(resolveOklabHueValueMock).toHaveBeenCalled();

            const lValueContext = resolveOklabLightnessValueMock.mock.calls[0][0];
            expect(lValueContext.input()).toEqual(input.l);

            const cValueContext = resolveOklabChromaValueMock.mock.calls[0][0];
            expect(cValueContext.input()).toEqual(input.c);

            const hValueContext = resolveOklabHueValueMock.mock.calls[0][0];
            expect(hValueContext.input()).toEqual(input.h);
        });

        it('should create a color with the resolved values', () => {
            resolveColorObject(mockContext, input);
            expect(createColorMock).toHaveBeenCalled();

            const colorValueContext = createColorMock.mock.calls[0][0];
            expect(colorValueContext.input()).toEqual({ l: 0.9, c: 0.5, h: 200 });
        });

        it('should return the created color', () => {
            const result = resolveColorObject(mockContext, input);
            expect(result).toBe(mockColor);
        });
    });

    describe('When input is invalid', () => {
        const input = {} as ColorObjectInput;

        const mockColor = {} as Color;

        beforeEach(() => {
            createColorMock.mockReturnValue(mockColor);
        });

        it('should add an error to the context', () => {
            resolveColorObject(mockContext, input);
            expect(mockContext.addError).toHaveBeenCalledOnce();
            const error = addErrorSpy.mock.calls[0][0];
            expect(error.message()).toContain('Invalid input data');
            expect(error.context).toEqual(mockContext);
            expect(error.valueName).toEqual(valueName);
            expect(error.input).toEqual(input);
        });

        it('should create a color with the resolved values', () => {
            resolveColorObject(mockContext, input);
            expect(createColorMock).toHaveBeenCalled();

            const colorValueContext = createColorMock.mock.calls[0][0];
            expect(colorValueContext.input()).toEqual(fallbackColor);
        });

        it('should return the created color', () => {
            const result = resolveColorObject(mockContext, input);
            expect(result).toBe(mockColor);
        });
    });
});
