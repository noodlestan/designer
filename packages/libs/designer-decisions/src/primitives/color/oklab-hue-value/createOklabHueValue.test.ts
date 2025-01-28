import { beforeEach, describe, expect, it } from 'vitest';

import type { ColorOklabHue, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createDecisionContextMock } from '../../mocks';

import { createOklabHueValue } from './createOklabHueValue';

describe('createOklabHueValue', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorOklabHue = 275;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabHueValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should consume the input', () => {
        createOklabHueValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value and allow .get()', () => {
        const result = createOklabHueValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should convert to a color with given channels', () => {
        const result = createOklabHueValue(valueContext, mockInput);

        const color = result.toColor({ l: 0.6, c: 0.15 });
        const [l, c, h] = color.get().oklch();

        expect(l).toBeCloseTo(0.6);
        expect(c).toBeCloseTo(0.15);
        expect(h).toBeCloseTo(275);
    });
});
