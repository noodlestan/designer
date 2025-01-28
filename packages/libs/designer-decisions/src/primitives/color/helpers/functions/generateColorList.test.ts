import { describe, expect, it, vi } from 'vitest';

import type {
    ColorModifierHSL,
    ColorModifierLCH,
    ColorOkLCHLiteral,
    ColorSRGBHSLiteral,
    ValueContext,
} from '../../../../types';
import { createColorValue } from '../../value';

import { generateColorList } from './generateColorList';

describe('generateColorList()', () => {
    const valueContextMock = {} as ValueContext;
    valueContextMock.consume = vi.fn();

    describe('Given no steps', () => {
        const anchor = createColorValue(valueContextMock, '#000000');

        it('should return an empty array', () => {
            const result = generateColorList(anchor, 0);
            expect(result).toEqual([]);
        });
    });

    describe('Given no modifier', () => {
        const anchor = createColorValue(valueContextMock, '#000000');
        const steps = 3;

        it('should return an array with the anchor value repeated', () => {
            const result = generateColorList(anchor, steps);
            expect(result).toEqual(Array(steps).fill(anchor.toObject('oklch')));
        });
    });

    describe('Given steps and a modifier with mode "oklch"', () => {
        const anchor = createColorValue(valueContextMock, { l: 0.1, c: 0.01, h: 30 });
        const steps = 3;
        const modifier: ColorModifierLCH = {
            space: 'oklch',
            l: { mode: 'linear', by: 0.3 },
            c: { mode: 'linear', by: 0.01 },
            h: { mode: 'linear', by: 20 },
        };

        it('should return an array with 3 oklch colors with modified lightness, chroma, and hue', () => {
            const result = generateColorList<ColorOkLCHLiteral>(anchor, steps, modifier);

            expect(result).toHaveLength(3);
            expect(result[0].l).toBeCloseTo(0.1);
            expect(result[1].l).toBeCloseTo(0.4);
            expect(result[2].l).toBeCloseTo(0.7);
            expect(result[0].c).toBeCloseTo(0.01);
            expect(result[1].c).toBeCloseTo(0.02);
            expect(result[2].c).toBeCloseTo(0.03);
            expect(result[0].h).toBeCloseTo(30);
            expect(result[1].h).toBeCloseTo(50);
            expect(result[2].h).toBeCloseTo(70);
        });
    });

    describe('Given steps and a modifier with mode "hsl"', () => {
        const anchor = createColorValue(valueContextMock, { h: 180, s: 0.5, l: 0.5 });
        const steps = 3;
        const modifier: ColorModifierHSL = {
            space: 'hsl',
            h: { mode: 'linear', by: 30 },
            s: { mode: 'linear', by: -0.1 },
            l: { mode: 'linear', by: 0.2 },
        };

        it('should return an array 3 of hsl colors with modified hue, saturation, and lightness', () => {
            const result = generateColorList<ColorSRGBHSLiteral>(anchor, steps, modifier, 'hsl');
            expect(result).toHaveLength(3);
            expect(result[0].h).toBeCloseTo(180);
            expect(result[1].h).toBeCloseTo(210);
            expect(result[2].h).toBeCloseTo(240);
            expect(result[0].s).toBeCloseTo(0.5);
            expect(result[1].s).toBeCloseTo(0.4);
            expect(result[2].s).toBeCloseTo(0.3);
            expect(result[0].l).toBeCloseTo(0.5);
            expect(result[1].l).toBeCloseTo(0.7);
            expect(result[2].l).toBeCloseTo(0.9);
        });
    });

    describe('Given a non-integer number of steps', () => {
        const anchor = createColorValue(valueContextMock, { h: 180, s: 0.5, l: 0.5 });
        const steps = 3.9;
        const modifier: ColorModifierHSL = {
            space: 'hsl',
            h: { mode: 'linear', by: 30 },
        };

        it('should return an array with floored number of steps', () => {
            const result = generateColorList<ColorSRGBHSLiteral>(anchor, steps, modifier, 'hsl');
            expect(result).toHaveLength(3);
        });
    });
});
