import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorSRGBHSLiteral, ColorSRGBHueInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { COLOR_CHANNEL_SRGB_HUE_NAME as name } from '../constants';

import { createSRGBHueValue } from './createSRGBHueValue';

describe('createSRGBHueValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input: ColorSRGBHueInput = 303.3533;

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

            expect(result.name()).toBe(name);
        });

        it('should expose the quantized value via get() and quantized()', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.get()).toEqual(303.4);
            expect(result.quantized()).toEqual(303.4);
        });

        it('should expose the raw via raw() and quantized(0)', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.raw()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should quantize the value', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.quantized(0.2)).toEqual(303.4);
        });

        it('should clamp the quantized value', () => {
            const result = createSRGBHueValue(valueContext, input);

            expect(result.quantized(400)).toEqual(360);
        });

        it('should convert to a color with given channels', () => {
            const result = createSRGBHueValue(valueContext, input);

            const color = result.toColor({ s: 0.5357, l: 0.0157 });
            const { h, s, l } = color.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toEqual(303.4);
            expect(s).toEqual(0.535);
            expect(l).toEqual(0.016);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 5 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createSRGBHueValue(valueContext, input, options);

            expect(result.get()).toEqual(305);
            expect(result.quantized()).toEqual(305);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createSRGBHueValue(valueContext, input, options);

            expect(result.raw()).toEqual(303.3533);
            expect(result.quantized(0)).toEqual(303.3533);
        });

        it('should (re)quantize the value', () => {
            const result = createSRGBHueValue(valueContext, input, options);

            expect(result.quantized(5)).toEqual(305);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createSRGBHueValue(valueContext, input, options);

            const color = result.toColor({ s: 0.535, l: 0.2657 });
            const { h, s, l } = color.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toEqual(305);
            expect(s).toEqual(0.55);
            expect(l).toEqual(0.25);
        });
    });
});
