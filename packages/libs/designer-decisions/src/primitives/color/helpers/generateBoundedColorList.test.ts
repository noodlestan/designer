import { describe, expect, it, vi } from 'vitest';

import { type ValueContext } from '../../../values';
import { createColorValue } from '../value';

import { generateBoundedColorList } from './generateBoundedColorList';

describe('generateBoundedColorList()', () => {
    const valueContextMock = {} as ValueContext;
    valueContextMock.consume = vi.fn();

    const fromColor = createColorValue(valueContextMock, '#000000');
    const toColor = createColorValue(valueContextMock, '#FFFFFF');

    describe('Given from, to, and steps', () => {
        const steps = 2;

        it('should return an array with expected items in oklch format', () => {
            const result = generateBoundedColorList(fromColor, toColor, steps);
            expect(result).toHaveLength(4);
            expect(result[0]).toEqual({ l: 0, c: 0, h: 0 });
            expect(result[1]).toEqual({ l: 0.3329, c: 0, h: 0 });
            expect(result[2]).toEqual({ l: 0.6665, c: 0, h: 0 });
            expect(result[3]).toEqual({ l: 1, c: 0, h: 0 });
        });
    });

    describe('Given from, to, steps, and a format', () => {
        const steps = 2;

        it('should return an array with expected items in the requested format', () => {
            const result = generateBoundedColorList(fromColor, toColor, steps, 'hsl');
            expect(result).toHaveLength(4);
            expect(result[0]).toEqual({ h: 0, s: 0, l: 0 });
            expect(result[1]).toEqual({ h: 0, s: 0, l: 0.2118 });
            expect(result[2]).toEqual({ h: 0, s: 0, l: 0.5804 });
            expect(result[3]).toEqual({ h: 0, s: 0, l: 1 });
        });
    });

    describe('Given steps is 0', () => {
        const steps = 0;

        it('should return an array with the from and to color only', () => {
            const result = generateBoundedColorList(fromColor, toColor, steps, 'hsl');
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ h: 0, s: 0, l: 0 });
            expect(result[1]).toEqual({ h: 180, s: 1, l: 1 });
        });
    });

    describe('Given steps is not an integer', () => {
        const fromColor = createColorValue(valueContextMock, '#000000');
        const toColor = createColorValue(valueContextMock, '#FFFFFF');
        const steps = 3.7;

        it('should floor the number of steps', () => {
            const result = generateBoundedColorList(fromColor, toColor, steps);
            expect(result).toHaveLength(5);
        });
    });
});
