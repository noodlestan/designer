import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

import { COLOR_FORMAT_HSL } from '../../channel/constants';
import type { Color } from '../types';

import { generateBoundedColorList } from './generateBoundedColorList';

describe('generateBoundedColorList()', () => {
    const fromMock = {
        raw: () => chroma('#000000'),
        toObject: () => ({ h: 0, s: 0, l: 0 }),
    } as unknown as Color;
    const toMock = {
        raw: () => chroma('#ffffff'),
        toObject: () => ({ h: 0, s: 0, l: 1 }),
    } as unknown as Color;

    describe('Given from, to, and steps', () => {
        const steps = 2;

        it('should return an array with expected items in oklch format', () => {
            const result = generateBoundedColorList(fromMock, toMock, steps);
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
            const result = generateBoundedColorList(fromMock, toMock, steps, COLOR_FORMAT_HSL);
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
            const result = generateBoundedColorList(fromMock, toMock, steps, COLOR_FORMAT_HSL);
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ h: 0, s: 0, l: 0 });
            expect(result[1]).toEqual({ h: 0, s: 0, l: 1 });
        });
    });

    describe('Given steps is not an integer', () => {
        const steps = 3.7;

        it('should floor the number of steps', () => {
            const result = generateBoundedColorList(fromMock, toMock, steps);
            expect(result).toHaveLength(5);
        });
    });
});
