import { describe, expect, it } from 'vitest';

import type {
    ColorModifierHSL,
    ColorModifierLCH,
    ColorOkLCHLiteral,
    ColorSRGBHSLiteral,
} from '../../../../inputs';
import { COLOR_FORMAT_HSL, COLOR_FORMAT_OKLCH } from '../constants';
import { ColorValue } from '../types';

import { generateColorList } from './generateColorList';

describe('generateColorList()', () => {
    describe('Given no steps', () => {
        const anchorMock = { toObject: () => ({ l: 0, c: 0, h: 0 }) } as unknown as ColorValue;

        it('should return an empty array', () => {
            const result = generateColorList(anchorMock, 0);
            expect(result).toEqual([]);
        });
    });

    describe('Given no modifier', () => {
        const anchorMock = { toObject: () => ({ l: 0, c: 0, h: 0 }) } as unknown as ColorValue;
        const steps = 3;

        it('should return an array with the anchor value repeated', () => {
            const result = generateColorList(anchorMock, steps);
            expect(result).toEqual(Array(steps).fill(anchorMock.toObject(COLOR_FORMAT_OKLCH)));
        });
    });

    describe('Given steps and a modifier with mode "oklch"', () => {
        const anchorMock = {
            toObject: () => ({ l: 0.1, c: 0.01, h: 30 }),
        } as unknown as ColorValue;
        const steps = 3;
        const modifier: ColorModifierLCH = {
            space: COLOR_FORMAT_OKLCH,
            l: { mode: 'linear', by: 0.3 },
            c: { mode: 'linear', by: 0.01 },
            h: { mode: 'linear', by: 20 },
        };

        it('should return an array with 3 oklch colors with modified lightness, chroma, and hue', () => {
            const result = generateColorList<ColorOkLCHLiteral>(anchorMock, steps, modifier);

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
        const anchorMock = {
            toObject: () => ({ h: 180, s: 0.5, l: 0.5 }),
        } as unknown as ColorValue;
        const steps = 3;
        const modifier: ColorModifierHSL = {
            space: COLOR_FORMAT_HSL,
            h: { mode: 'linear', by: 30 },
            s: { mode: 'linear', by: -0.1 },
            l: { mode: 'linear', by: 0.2 },
        };

        it('should return an array 3 of hsl colors with modified hue, saturation, and lightness', () => {
            const result = generateColorList<ColorSRGBHSLiteral>(
                anchorMock,
                steps,
                modifier,
                COLOR_FORMAT_HSL,
            );
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
        const anchorMock = {
            toObject: () => ({ h: 180, s: 0.5, l: 0.5 }),
        } as unknown as ColorValue;
        const steps = 3.9;
        const modifier: ColorModifierHSL = {
            space: COLOR_FORMAT_HSL,
            h: { mode: 'linear', by: 30 },
        };

        it('should return an array with floored number of steps', () => {
            const result = generateColorList<ColorSRGBHSLiteral>(anchorMock, steps, modifier);
            expect(result).toHaveLength(3);
        });
    });
});
