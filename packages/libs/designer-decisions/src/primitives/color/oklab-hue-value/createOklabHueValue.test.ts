import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorOkLCHLiteral, ColorOklabHueInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createOklabHueValue } from './createOklabHueValue';
import { CHANNEL_NAME } from './private';

describe('createOklabHueValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input: ColorOklabHueInput = 301.1533;

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

            expect(result.name()).toBe(CHANNEL_NAME);
        });

        it('should consume the input', () => {
            createOklabHueValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the resolved value via get(), raw(), and quantized()', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.get()).toEqual(input);
            expect(result.raw()).toEqual(input);
            expect(result.quantized()).toEqual(input);
            expect(result.quantized(0)).toEqual(input);
        });

        it('should quantize the value', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.quantized(0.2)).toEqual(301.2);
        });

        it('should clamp the quantized value', () => {
            const result = createOklabHueValue(valueContext, input);

            expect(result.quantized(400)).toEqual(360);
        });

        it('should convert to a color with given channels', () => {
            const result = createOklabHueValue(valueContext, input);

            const color = result.toColor({ c: 0.1347, l: 0.555 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>('oklch');

            expect(l).toBeCloseTo(0.555);
            expect(c).toBeCloseTo(0.1347);
            expect(h).toBeCloseTo(301.1533);
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .get() and quantized()', () => {
            const result = createOklabHueValue(valueContext, input, options);

            expect(result.get()).toEqual(302);
            expect(result.quantized()).toEqual(302);
        });

        it('should expose the raw value via .raw() and quantized(0)', () => {
            const result = createOklabHueValue(valueContext, input, options);

            expect(result.raw()).toEqual(301.1533);
            expect(result.quantized(0)).toEqual(301.1533);
        });

        it('should (re)quantize the value', () => {
            const result = createOklabHueValue(valueContext, input, options);

            expect(result.quantized(2)).toEqual(302);
        });

        it('should convert to a color with complimentary channels quantized', () => {
            const result = createOklabHueValue(valueContext, input, options);

            const color = result.toColor({ c: 0.1347, l: 0.5157 });
            const { l, c, h } = color.toObject<ColorOkLCHLiteral>('oklch');

            expect(l).toEqual(0.52);
            expect(c).toEqual(0.14);
            expect(h).toEqual(302);
        });
    });
});
