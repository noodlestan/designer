import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorOklabLightnessInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createOklabLightnessValue } from './createOklabLightnessValue';
import { CHANNEL_NAME } from './private';

describe('createOklabLightnessValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorOklabLightnessInput = 0.7;

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

    it('should expose the resolved value and allow .get()', () => {
        const result = createOklabLightnessValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should convert to a color with given channels', () => {
        const result = createOklabLightnessValue(valueContext, mockInput);

        const color = result.toColor({ c: 0.1, h: 180 });
        const [l, c, h] = color.get().oklch();

        expect(l).toBeCloseTo(0.7);
        expect(c).toBeCloseTo(0.1);
        expect(h).toBeCloseTo(180);
    });
});
