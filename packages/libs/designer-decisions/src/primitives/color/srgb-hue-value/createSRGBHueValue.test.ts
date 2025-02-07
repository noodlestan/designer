import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorSRGBHSLiteral, ColorSRGBHueInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSRGBHueValue } from './createSRGBHueValue';
import { CHANNEL_NAME } from './private';

describe('createSRGBHueValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input: ColorSRGBHueInput = 301.1533;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    describe('Given a value', () => {
        it('should have the provided context', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should have the expected name', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.name()).toBe(CHANNEL_NAME);
        });

        it('should consume the input', () => {
            createSRGBHueValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the resolved value via get(), raw(), and quantized()', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.get()).toEqual(input);
            expect(result.raw()).toEqual(input);
            expect(result.quantized()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should quantize the value', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.quantized(0.2)).toEqual(301.2);
        });

        it('should clamp the quantized value', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.quantized(400)).toEqual(360);
        });

        it('should convert to a color with given channels', () => {
            const result = createSRGBHueValue(valueContext, input);

            const color = result.toColor({ s: 0.535, l: 0.0157 });
            const { h, s, l } = color.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toBeCloseTo(301.1533);
            expect(s).toBeCloseTo(0.535);
            expect(l).toBeCloseTo(0.0157);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createSRGBHueValue(valueContext, input, options);

            expect(result.get()).toEqual(302);
            expect(result.quantized()).toEqual(302);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createSRGBHueValue(valueContext, input, options);

            expect(result.raw()).toEqual(301.1533);
            expect(result.quantized(0)).toEqual(301.1533);
        });

        it('should (re)quantize the value', () => {
            const result = createSRGBHueValue(valueContext, input, options);

            expect(result.quantized(2)).toEqual(302);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createSRGBHueValue(valueContext, input, options);

            const color = result.toColor({ s: 0.535, l: 0.0157 });
            const { h, s, l } = color.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toEqual(302);
            expect(s).toEqual(0.54);
            expect(l).toEqual(0.02);
        });
    });
});
