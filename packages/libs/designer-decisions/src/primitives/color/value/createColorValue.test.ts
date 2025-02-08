import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorSRGBHSLiteral, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createColorValue } from './createColorValue';

describe('createColorValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const input = { h: 231.433, s: 0.33587, l: 0.45128 };

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });
    describe('Given a value', () => {
        it('should have the provided context', () => {
            const colorValue = createColorValue(valueContext, input);

            expect(colorValue.context()).toBe(valueContext);
        });

        it('should consume the input', () => {
            createColorValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the resolved value via .get()', () => {
            const colorValue = createColorValue(valueContext, input);

            const { h, s, l } = colorValue.toObject<ColorSRGBHSLiteral>('hsl');
            expect(h).toBe(231.4);
            expect(s).toBe(0.336);
            expect(l).toBe(0.451);
        });

        it('should format toObject("rgb") correctly', () => {
            const colorValue = createColorValue(valueContext, input);

            expect(colorValue.toObject('rgb')).toEqual({ r: 76, g: 87, b: 154 });
        });

        it('should format toString("rgb") correctly', () => {
            const colorValue = createColorValue(valueContext, input);

            expect(colorValue.toString('rgb')).toBe('#4c579a');
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .toObject()', () => {
            const colorValue = createColorValue(valueContext, input, options);

            const { h, s, l } = colorValue.toObject<ColorSRGBHSLiteral>('hsl');

            expect(h).toBe(232);
            expect(s).toBe(0.34);
            expect(l).toBe(0.46);
        });

        it('should expose the raw value via .get()', () => {
            const result = createColorValue(valueContext, input, options);

            const [h, s, l] = result.get().hsl();

            expect(h).toBeCloseTo(input.h);
            expect(s).toBeCloseTo(input.s);
            expect(l).toBeCloseTo(input.l);
        });

        it('should (re)quantize the value via toObject()', () => {
            const result = createColorValue(valueContext, input, options);

            const { h, s, l } = result.toObject<ColorSRGBHSLiteral>('hsl', { quantize: 5 });
            expect(h).toBe(230);
            expect(s).toBe(0.35);
            expect(l).toBe(0.45);
        });

        it('should (re)quantize the value via toString()', () => {
            const result = createColorValue(valueContext, input, options);

            const hsl = result.toString('hsl', { quantize: 1 });
            expect(hsl).toBe('hsl(231deg 34% 45%)');
        });
    });
});
