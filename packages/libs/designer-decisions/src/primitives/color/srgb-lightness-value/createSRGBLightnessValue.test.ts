import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorSRGBLightnessInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSRGBLightnessValue } from './createSRGBLightnessValue';
import { CHANNEL_NAME } from './private';

describe('createSRGBLightnessValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorSRGBLightnessInput = 0.5;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createSRGBLightnessValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should have the expected name', () => {
        const result = createSRGBLightnessValue(valueContext, mockInput);

        expect(result.name()).toBe(CHANNEL_NAME);
    });

    it('should consume the input', () => {
        createSRGBLightnessValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createSRGBLightnessValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should expose quantized value', () => {
        const result = createSRGBLightnessValue(valueContext, mockInput, { quantize: 0.2 });

        expect(result.get()).toEqual(0.6);
    });

    it('should clamp the input value', () => {
        const result = createSRGBLightnessValue(valueContext, 2);

        expect(result.get()).toEqual(1);
    });

    it('should clamp the rounded value', () => {
        const result = createSRGBLightnessValue(valueContext, 1, { quantize: 2 });

        expect(result.get()).toEqual(1);
    });

    it('should convert to a color with given channels', () => {
        const result = createSRGBLightnessValue(valueContext, mockInput);

        const color = result.toColor({ h: 210, s: 0.65 });
        const [h, s, l] = color.get().hsl();

        expect(h).toBeCloseTo(210);
        expect(s).toBeCloseTo(0.65);
        expect(l).toBeCloseTo(0.5);
    });
});
