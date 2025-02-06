import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorSRGBHueInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSRGBHueValue } from './createSRGBHueValue';
import { CHANNEL_NAME } from './private';

describe('createSRGBHueValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorSRGBHueInput = 120;

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

    it('should expose the resolved value and allow .get()', () => {
        const result = createSRGBHueValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should convert to a color with given channels', () => {
        const result = createSRGBHueValue(valueContext, mockInput);

        const color = result.toColor({ s: 0.8, l: 0.6 });
        const [h, s, l] = color.get().hsl();

        expect(h).toBeCloseTo(120);
        expect(s).toBeCloseTo(0.8);
        expect(l).toBeCloseTo(0.6);
    });
});
