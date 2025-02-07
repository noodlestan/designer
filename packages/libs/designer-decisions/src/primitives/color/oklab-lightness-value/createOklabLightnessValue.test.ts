import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorOklabLightnessInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createOklabLightnessValue } from './createOklabLightnessValue';
import { CHANNEL_NAME } from './private';

describe('createOklabLightnessValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorOklabLightnessInput = 0.71;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabLightnessValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should have the expected name', () => {
        const result = createOklabLightnessValue(valueContext, mockInput);

        expect(result.name()).toBe(CHANNEL_NAME);
    });

    it('should consume the input', () => {
        createOklabLightnessValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createOklabLightnessValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should expose value rounded to precision', () => {
        const result = createOklabLightnessValue(valueContext, mockInput, { precision: 0.2 });

        expect(result.get()).toEqual(0.8);
    });

    it('should clamp the input value', () => {
        const result = createOklabLightnessValue(valueContext, 2);

        expect(result.get()).toEqual(1);
    });

    it('should clamp the rounded value', () => {
        const result = createOklabLightnessValue(valueContext, 1, { precision: 2 });

        expect(result.get()).toEqual(1);
    });

    it('should convert to a color with given channels', () => {
        const result = createOklabLightnessValue(valueContext, mockInput);

        const color = result.toColor({ c: 0.1, h: 180 });
        const [l, c, h] = color.get().oklch();

        expect(l).toBeCloseTo(0.71);
        expect(c).toBeCloseTo(0.1);
        expect(h).toBeCloseTo(180);
    });
});
