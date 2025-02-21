import { beforeEach, describe, expect, it } from 'vitest';

import type { ColorSRGBHSLiteral, ColorSRGBSaturationInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { COLOR_CHANNEL_SRGB_SATURATION_NAME as name } from '../../../primitives/color/constants';

import { createSRGBSaturationValue } from './createSRGBSaturationValue';

describe('createSRGBSaturationValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input: ColorSRGBSaturationInput = 0.7776;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    describe('Given a value', () => {
        it('should have the provided context', () => {
            const result = createSRGBSaturationValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should have the expected name', () => {
            const result = createSRGBSaturationValue(valueContext, input);

            expect(result.name()).toBe(name);
        });

        it('should consume the input', () => {
            createSRGBSaturationValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the quantized value via get() and quantized()', () => {
            const result = createSRGBSaturationValue(valueContext, input);

            expect(result.get()).toEqual(0.778);
            expect(result.quantized()).toEqual(0.778);
        });

        it('should expose the raw via raw() and quantized(0)', () => {
            const result = createSRGBSaturationValue(valueContext, input);

            expect(result.raw()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should quantize the value', () => {
            const result = createSRGBSaturationValue(valueContext, input);

            expect(result.quantized(0.05)).toEqual(0.7775);
        });

        it('should clamp the quantized value', () => {
            const result = createSRGBSaturationValue(valueContext, input);

            expect(result.quantized(101)).toEqual(1);
        });

        it('should convert to a color with given channels', () => {
            const result = createSRGBSaturationValue(valueContext, input);

            const color = result.toColor({ h: 301.1533, l: 0.0157 });
            const { h, s, l } = color.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toEqual(301.2);
            expect(s).toEqual(0.777);
            expect(l).toEqual(0.016);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createSRGBSaturationValue(valueContext, input, options);

            expect(result.get()).toEqual(0.78);
            expect(result.quantized()).toEqual(0.78);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createSRGBSaturationValue(valueContext, input, options);

            expect(result.raw()).toEqual(0.7776);
            expect(result.quantized(0)).toEqual(0.7776);
        });

        it('should (re)quantize the value', () => {
            const result = createSRGBSaturationValue(valueContext, input, options);

            expect(result.quantized(0.05)).toEqual(0.7775);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createSRGBSaturationValue(valueContext, input, options);

            const color = result.toColor({ h: 301.1533, l: 0.0157 });
            const { h, s, l } = color.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toEqual(302);
            expect(s).toEqual(0.78);
            expect(l).toEqual(0.02);
        });
    });
});
