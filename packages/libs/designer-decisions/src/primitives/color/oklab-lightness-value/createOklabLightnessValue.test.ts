import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorOkLCHLiteral, ColorOklabLightnessInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createOklabLightnessValue } from './createOklabLightnessValue';
import { CHANNEL_NAME } from './private';

describe('createOklabLightnessValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input: ColorOklabLightnessInput = 0.7776;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    describe('Given a value', () => {
        it('should have the provided context', () => {
            const result = createOklabLightnessValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should have the expected name', () => {
            const result = createOklabLightnessValue(valueContext, input);

            expect(result.name()).toBe(CHANNEL_NAME);
        });

        it('should consume the input', () => {
            createOklabLightnessValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the resolved value via get(), raw(), and quantized()', () => {
            const result = createOklabLightnessValue(valueContext, input);

            expect(result.get()).toEqual(input);
            expect(result.raw()).toEqual(input);
            expect(result.quantized()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should quantize the value', () => {
            const result = createOklabLightnessValue(valueContext, input);

            expect(result.quantized(0.2)).toEqual(0.778);
        });

        it('should clamp the quantized value', () => {
            const result = createOklabLightnessValue(valueContext, input);

            expect(result.quantized(101)).toEqual(1);
        });

        it('should convert to a color with given channels', () => {
            const result = createOklabLightnessValue(valueContext, input);

            const color = result.toColor({ c: 0.0157, h: 301.1533 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>('oklch');

            expect(l).toBeCloseTo(0.7776);
            expect(c).toBeCloseTo(0.0157);
            expect(h).toBeCloseTo(301.1533);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createOklabLightnessValue(valueContext, input, options);

            expect(result.get()).toEqual(0.78);
            expect(result.quantized()).toEqual(0.78);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createOklabLightnessValue(valueContext, input, options);

            expect(result.raw()).toEqual(0.7776);
            expect(result.quantized(0)).toEqual(0.7776);
        });

        it('should (re)quantize the value', () => {
            const result = createOklabLightnessValue(valueContext, input, options);

            expect(result.quantized(0.05)).toEqual(0.7775);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createOklabLightnessValue(valueContext, input, options);

            const color = result.toColor({ c: 0.0157, h: 301.1533 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>('oklch');

            expect(l).toEqual(0.78);
            expect(c).toEqual(0.02);
            expect(h).toEqual(302);
        });
    });
});
