import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorOklabLightnessInput, ColorSRGBHSLiteral, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSRGBLightnessValue } from './createSRGBLightnessValue';
import { CHANNEL_NAME } from './private';

describe('createSRGBLightnessValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input: ColorOklabLightnessInput = 0.7776;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    describe('Given a value', () => {
        it('should have the provided context', () => {
            const result = createSRGBLightnessValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should have the expected name', () => {
            const result = createSRGBLightnessValue(valueContext, input);

            expect(result.name()).toBe(CHANNEL_NAME);
        });

        it('should consume the input', () => {
            createSRGBLightnessValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the resolved value via get(), raw(), and quantized()', () => {
            const result = createSRGBLightnessValue(valueContext, input);

            expect(result.get()).toEqual(input);
            expect(result.raw()).toEqual(input);
            expect(result.quantized()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should quantize the value', () => {
            const result = createSRGBLightnessValue(valueContext, input);

            expect(result.quantized(0.2)).toEqual(0.778);
        });

        it('should clamp the quantized value', () => {
            const result = createSRGBLightnessValue(valueContext, input);

            expect(result.quantized(101)).toEqual(1);
        });

        it('should convert to a color with given channels', () => {
            const result = createSRGBLightnessValue(valueContext, input);

            const color = result.toColor({ h: 301.1892, s: 0.0157 });
            const { h, s, l } = color.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toBeCloseTo(301.1892);
            expect(s).toBeCloseTo(0.0157);
            expect(l).toBeCloseTo(0.7776);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createSRGBLightnessValue(valueContext, input, options);

            expect(result.get()).toEqual(0.78);
            expect(result.quantized()).toEqual(0.78);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createSRGBLightnessValue(valueContext, input, options);

            expect(result.raw()).toEqual(0.7776);
            expect(result.quantized(0)).toEqual(0.7776);
        });

        it('should (re)quantize the value', () => {
            const result = createSRGBLightnessValue(valueContext, input, options);

            expect(result.quantized(0.05)).toEqual(0.7775);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createSRGBLightnessValue(valueContext, input, options);

            const color = result.toColor({ h: 301.1533, s: 0.0157 });
            const { h, s, l } = color.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toEqual(302);
            expect(s).toEqual(0.02);
            expect(l).toEqual(0.78);
        });
    });
});
