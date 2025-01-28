import { beforeEach, describe, expect, it } from 'vitest';

import type { ColorOklabLightness, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createDecisionContextMock } from '../../mocks';

import { createOklabLightnessValue } from './createOklabLightnessValue';

describe('createOklabLightnessValue', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorOklabLightness = 0.7;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabLightnessValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
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
