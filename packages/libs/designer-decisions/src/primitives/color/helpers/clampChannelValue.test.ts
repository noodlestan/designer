import { describe, expect, it } from 'vitest';

import { clampChannelValue } from './clampChannelValue';

describe('clampChannelValue()', () => {
    describe('Given oklab-lightness channel and a value below the bottom boundary', () => {
        it('should return the bottom boundary', () => {
            const result = clampChannelValue(-3, 'oklab-lightness');
            expect(result).toBe(0);
        });
    });

    describe('Given oklab-lightness channel and a value above the top boundary', () => {
        it('should return the top boundary', () => {
            const result = clampChannelValue(999, 'oklab-lightness');
            expect(result).toBe(1);
        });
    });

    describe('Given oklab-chroma channel and a value below the bottom boundary', () => {
        it('should return the bottom boundary', () => {
            const result = clampChannelValue(-3, 'oklab-chroma');
            expect(result).toBe(0);
        });
    });

    describe('Given oklab-chroma channel and a value above the top boundary', () => {
        it('should return the top boundary', () => {
            const result = clampChannelValue(999, 'oklab-chroma');
            expect(result).toBe(0.5);
        });
    });

    describe('Given oklab-hue channel and a value below the bottom boundary', () => {
        it('should return the bottom boundary', () => {
            const result = clampChannelValue(-3, 'oklab-hue');
            expect(result).toBe(0);
        });
    });

    describe('Given oklab-hue channel and a value above the top boundary', () => {
        it('should return the top boundary', () => {
            const result = clampChannelValue(999, 'oklab-hue');
            expect(result).toBe(360);
        });
    });

    describe('Given srgb-hue channel and a value below the bottom boundary', () => {
        it('should return the bottom boundary', () => {
            const result = clampChannelValue(-3, 'srgb-hue');
            expect(result).toBe(0);
        });
    });

    describe('Given srgb-hue channel and a value above the top boundary', () => {
        it('should return the top boundary', () => {
            const result = clampChannelValue(999, 'srgb-hue');
            expect(result).toBe(360);
        });
    });

    describe('Given srgb-saturation channel and a value below the bottom boundary', () => {
        it('should return the bottom boundary', () => {
            const result = clampChannelValue(-3, 'srgb-saturation');
            expect(result).toBe(0);
        });
    });

    describe('Given srgb-saturation channel and a value above the top boundary', () => {
        it('should return the top boundary', () => {
            const result = clampChannelValue(999, 'srgb-saturation');
            expect(result).toBe(1);
        });
    });
    describe('Given srgb-lightness channel and a value below the bottom boundary', () => {
        it('should return the bottom boundary', () => {
            const result = clampChannelValue(-3, 'srgb-lightness');
            expect(result).toBe(0);
        });
    });

    describe('Given srgb-lightness channel and a value above the top boundary', () => {
        it('should return the top boundary', () => {
            const result = clampChannelValue(999, 'srgb-lightness');
            expect(result).toBe(1);
        });
    });
});
