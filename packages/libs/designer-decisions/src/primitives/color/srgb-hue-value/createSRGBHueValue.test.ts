import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorSRGBHueInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSRGBHueValue } from './createSRGBHueValue';
import { CHANNEL_NAME } from './private';

describe('createSRGBHueValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorSRGBHueInput = 121.111;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createSRGBHueValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should have the expected name', () => {
        const result = createSRGBHueValue(valueContext, mockInput);

        expect(result.name()).toBe(CHANNEL_NAME);
    });

    it('should consume the input', () => {
        createSRGBHueValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createSRGBHueValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should expose value rounded to precision', () => {
        const result = createSRGBHueValue(valueContext, mockInput, { precision: 2 });

        expect(result.get()).toEqual(122);
    });

    it('should clamp the input value', () => {
        const result = createSRGBHueValue(valueContext, 365);

        expect(result.get()).toEqual(360);
    });

    it('should clamp the rounded value', () => {
        const result = createSRGBHueValue(valueContext, 360, { precision: 400 });

        expect(result.get()).toEqual(360);
    });

    it('should convert to a color with given channels', () => {
        const result = createSRGBHueValue(valueContext, mockInput);

        const color = result.toColor({ s: 0.8, l: 0.6 });
        const [h, s, l] = color.get().hsl();

        expect(h).toBeCloseTo(121.111);
        expect(s).toBeCloseTo(0.8);
        expect(l).toBeCloseTo(0.6);
    });
});
