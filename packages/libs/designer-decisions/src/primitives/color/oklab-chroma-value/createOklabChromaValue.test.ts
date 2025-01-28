import { beforeEach, describe, expect, it } from 'vitest';

import type { ColorOklabChroma, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createDecisionContextMock } from '../../mocks';

import { createOklabChromaValue } from './createOklabChromaValue';

describe('createOklabChromaValue', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorOklabChroma = 0.2;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabChromaValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should consume the input', () => {
        createOklabChromaValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value and allow .get()', () => {
        const result = createOklabChromaValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should convert to a color with given channels', () => {
        const result = createOklabChromaValue(valueContext, mockInput);

        const color = result.toColor({ h: 300, l: 0.5 });
        const [l, c, h] = color.get().oklch();

        expect(h).toBeCloseTo(300);
        expect(c).toBeCloseTo(0.2);
        expect(l).toBeCloseTo(0.5);
    });
});
