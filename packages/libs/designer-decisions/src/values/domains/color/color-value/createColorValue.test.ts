import { beforeEach, describe, expect, it } from 'vitest';

import type { ColorSRGBHSLiteral } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { COLOR_FORMAT_HSL, COLOR_FORMAT_RGB } from '../../../primitives';

import { createColorValue } from './createColorValue';

describe('createColorValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();
    const input = { h: 231.433, s: 0.33587, l: 0.45128 };

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(mockDecisionContext);
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

            const { h, s, l } = colorValue.toObject<ColorSRGBHSLiteral>(COLOR_FORMAT_HSL);
            expect(h).toBe(231.4);
            expect(s).toBe(0.336);
            expect(l).toBe(0.451);
        });

        it('should format toObject("rgb") correctly', () => {
            const colorValue = createColorValue(valueContext, input);

            expect(colorValue.toObject(COLOR_FORMAT_RGB)).toEqual({ r: 76, g: 87, b: 154 });
        });

        it('should format toString("rgb") correctly', () => {
            const colorValue = createColorValue(valueContext, input);

            expect(colorValue.toString(COLOR_FORMAT_RGB)).toBe('#4c579a');
        });
    });

    describe('Given a quantize option', () => {
        const options = { quantize: 2 };

        it('should expose the quantized value via .toObject()', () => {
            const colorValue = createColorValue(valueContext, input, options);

            const { h, s, l } = colorValue.toObject<ColorSRGBHSLiteral>(COLOR_FORMAT_HSL);

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

            const { h, s, l } = result.toObject<ColorSRGBHSLiteral>(COLOR_FORMAT_HSL, {
                quantize: 5,
            });
            expect(h).toBe(230);
            expect(s).toBe(0.35);
            expect(l).toBe(0.45);
        });

        it('should (re)quantize the value via toString()', () => {
            const result = createColorValue(valueContext, input, options);

            const hsl = result.toString(COLOR_FORMAT_HSL, { quantize: 1 });
            expect(hsl).toBe('hsl(231deg 34% 45%)');
        });
    });
});
