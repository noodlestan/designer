import { describe, expect, it, vi } from 'vitest';

import type { AnchoredColorListParams, ColorOkLCHLiteral } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import type { ColorValue } from '../types';

import { generateAnchoredColorList } from './generateAnchoredColorList';

describe('generateAnchoredColorList()', () => {
    const valueContextMock = {} as ValueContext;
    valueContextMock.consume = vi.fn();

    const anchorMock = { toObject: () => ({ l: 0.5, c: 0.01, h: 30 }) } as unknown as ColorValue;

    describe('Given before and after params with steps and modifiers', () => {
        const params: AnchoredColorListParams = {
            before: {
                steps: 1,
                modifier: {
                    space: 'oklch',
                    l: { mode: 'linear', by: -0.2 },
                },
            },
            after: {
                steps: 2,
                modifier: {
                    space: 'oklch',
                    l: { mode: 'linear', by: 0.2 },
                },
            },
        };

        it('should return an array with expected items in oklch format', () => {
            const result = generateAnchoredColorList<ColorOkLCHLiteral>(anchorMock, params);
            expect(result).toHaveLength(4);
            expect(result[0].l).toBeCloseTo(0.3);
            expect(result[0].c).toBeCloseTo(0.01);
            expect(result[0].h).toBeCloseTo(30);

            expect(result[1].l).toBeCloseTo(0.5);
            expect(result[1].c).toBeCloseTo(0.01);
            expect(result[1].h).toBeCloseTo(30);

            expect(result[2].l).toBeCloseTo(0.7);
            expect(result[2].c).toBeCloseTo(0.01);
            expect(result[2].h).toBeCloseTo(30);

            expect(result[3].l).toBeCloseTo(0.9);
            expect(result[3].c).toBeCloseTo(0.01);
            expect(result[3].h).toBeCloseTo(30);
        });
    });

    describe('Given no before or after params', () => {
        const params: AnchoredColorListParams = {};

        it('should return an array with only the anchor color', () => {
            const result = generateAnchoredColorList<ColorOkLCHLiteral>(
                anchorMock,
                params,
                'oklch',
            );
            expect(result[0].l).toBeCloseTo(0.5);
            expect(result[0].c).toBeCloseTo(0.01);
            expect(result[0].h).toBeCloseTo(30);
        });
    });

    describe('Given steps of 0 for before and after', () => {
        const params: AnchoredColorListParams = {
            before: {
                steps: 0,
                modifier: { space: 'oklch', l: { mode: 'linear', by: -0.2 } },
            },
            after: {
                steps: 0,
                modifier: { space: 'oklch', l: { mode: 'linear', by: 0.2 } },
            },
        };

        it('should return an array with only the anchor color', () => {
            const result = generateAnchoredColorList<ColorOkLCHLiteral>(
                anchorMock,
                params,
                'oklch',
            );
            expect(result).toHaveLength(1);
            expect(result[0].l).toBeCloseTo(0.5);
            expect(result[0].c).toBeCloseTo(0.01);
            expect(result[0].h).toBeCloseTo(30);
        });
    });

    describe('Given steps as a non-integer value', () => {
        const params: AnchoredColorListParams = {
            before: {
                steps: 2.7,
                modifier: {
                    space: 'oklch',
                    l: { mode: 'linear', by: -0.2 },
                },
            },
            after: {
                steps: 2.7,
                modifier: {
                    space: 'oklch',
                    l: { mode: 'linear', by: 0.2 },
                },
            },
        };

        it('should floor the number of steps', () => {
            const result = generateAnchoredColorList(anchorMock, params, 'oklch');
            expect(result).toHaveLength(5);
        });
    });
});
