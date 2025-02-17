import { beforeEach, describe, expect, it } from 'vitest';

import type { ColorOkLCHLiteral, ColorOklabHueInput } from '../../../inputs';
import { createDecisionContextMock } from '../../../mocks';
import { type ValueContext, createValueContext } from '../../../values';
import { COLOR_CHANNEL_OKLAB_HUE_NAME as name } from '../constants';

import { createOklabHueValue } from './createOklabHueValue';

describe('createOklabHueValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input: ColorOklabHueInput = 303.3533;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    describe('Given a value', () => {
        it('should have the provided context', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should have the expected name', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.name()).toBe(name);
        });

        it('should consume the input', () => {
            createOklabHueValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the quantized value via get() and quantized()', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.get()).toEqual(303.4);
            expect(result.quantized()).toEqual(303.4);
        });

        it('should expose the raw via raw() and quantized(0)', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.raw()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should quantize the value', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.quantized(0.5)).toEqual(303.5);
        });

        it('should clamp the quantized value', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.quantized(400)).toEqual(360);
        });

        it('should convert to a color with given channels', () => {
            const result = createOklabHueValue(valueContext, input);

            const color = result.toColor({ c: 0.1347, l: 0.5557 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>('oklch');

            expect(l).toEqual(0.556);
            expect(c).toEqual(0.135);
            expect(h).toEqual(303.3);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createOklabHueValue(valueContext, input, options);

            expect(result.get()).toEqual(304);
            expect(result.quantized()).toEqual(304);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createOklabHueValue(valueContext, input, options);

            expect(result.raw()).toEqual(303.3533);
            expect(result.quantized(0)).toEqual(303.3533);
        });

        it('should (re)quantize the value', () => {
            const result = createOklabHueValue(valueContext, input, options);

            expect(result.quantized(5)).toEqual(305);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createOklabHueValue(valueContext, input, options);

            const color = result.toColor({ c: 0.1347, l: 0.5157 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>('oklch');

            expect(l).toEqual(0.52);
            expect(c).toEqual(0.14);
            expect(h).toEqual(304);
        });
    });
});
