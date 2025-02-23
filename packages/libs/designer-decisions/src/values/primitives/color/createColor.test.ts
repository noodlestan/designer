import { describe, expect, it } from 'vitest';

import type { ColorSRGBHSLiteral } from '../../../inputs';

import { COLOR_FORMAT_HSL } from './constants';
import { createColor } from './createColor';

describe('createColor()', () => {
    describe('Given a ColorLiteral', () => {
        const colorLiteral = { h: 300, s: 0.6, l: 0.4 };
        const color = createColor(colorLiteral);

        it('should return the expected color', () => {
            const result = color.get().hsl();

            expect(result[0]).toBeCloseTo(300);
            expect(result[1]).toBeCloseTo(0.6);
            expect(result[2]).toBeCloseTo(0.4);
        });

        it('should return the object in the requested format', () => {
            const result = color.toObject<ColorSRGBHSLiteral>(COLOR_FORMAT_HSL);

            expect(result.h).toBeCloseTo(300);
            expect(result.s).toBeCloseTo(0.6);
            expect(result.l).toBeCloseTo(0.4);
        });

        it('should return a string in the requested format', () => {
            const result = color.toString(COLOR_FORMAT_HSL);

            expect(result).toBe('hsl(300deg 60% 40%)');
        });
    });
});
