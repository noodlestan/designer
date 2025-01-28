import { beforeEach, describe, expect, it } from 'vitest';

import type { ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createDecisionContextMock } from '../../mocks';

import { createColorValue } from './createColorValue';

describe('createColorValue', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = { h: 123, s: 0.3, l: 0.5 };

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const colorValue = createColorValue(valueContext, mockInput);

        expect(colorValue.context()).toBe(valueContext);
    });

    it('should consume the input', () => {
        createColorValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value and allow .get()', () => {
        const colorValue = createColorValue(valueContext, mockInput);

        const [h, s, l] = colorValue.get().hsl();
        expect(h).toBeCloseTo(mockInput.h);
        expect(s).toBeCloseTo(mockInput.s);
        expect(l).toBeCloseTo(mockInput.l);
    });

    it('should format toObject("rgb") correctly', () => {
        const colorValue = createColorValue(valueContext, mockInput);

        expect(colorValue.toObject('rgb')).toEqual({ r: 89, g: 166, b: 93 });
    });

    it('should format toString("rgb") correctly', () => {
        const colorValue = createColorValue(valueContext, mockInput);

        expect(colorValue.toString('rgb')).toBe('#59a65d');
    });
});
