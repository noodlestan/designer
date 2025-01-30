import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorSRGBLightnessInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSRGBLightnessValue } from './createSRGBLightnessValue';

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

    it('should consume the input', () => {
        createSRGBLightnessValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value and allow .get()', () => {
        const result = createSRGBLightnessValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
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
