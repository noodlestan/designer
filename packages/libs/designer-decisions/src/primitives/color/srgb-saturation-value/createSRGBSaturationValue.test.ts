import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorSRGBSaturationInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSRGBSaturationValue } from './createSRGBSaturationValue';
import { CHANNEL_NAME } from './private';

describe('createSRGBSaturationValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorSRGBSaturationInput = 0.75;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createSRGBSaturationValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should have the expected name', () => {
        const result = createSRGBSaturationValue(valueContext, mockInput);

        expect(result.name()).toBe(CHANNEL_NAME);
    });

    it('should consume the input', () => {
        createSRGBSaturationValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value and allow .get()', () => {
        const result = createSRGBSaturationValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should convert to a color with given channels', () => {
        const result = createSRGBSaturationValue(valueContext, mockInput);

        const color = result.toColor({ h: 200, l: 0.5 });
        const [h, s, l] = color.get().hsl();

        expect(h).toBeCloseTo(200);
        expect(s).toBeCloseTo(0.75);
        expect(l).toBeCloseTo(0.5);
    });
});
