import { describe, expect, it } from 'vitest';

import { mockChannelDefinition } from '../../../../mocks';

import { clampChannelValue } from './clampChannelValue';

describe('clampChannelValue()', () => {
    describe('Given oklab-lightness channel and a value below the bottom boundary', () => {
        it('should return the bottom boundary', () => {
            const result = clampChannelValue(mockChannelDefinition, -3000);
            expect(result).toBe(-1000);
        });
    });

    describe('Given oklab-lightness channel and a value above the top boundary', () => {
        it('should return the top boundary', () => {
            const result = clampChannelValue(mockChannelDefinition, 3000);
            expect(result).toBe(1000);
        });
    });
});
