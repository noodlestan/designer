import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorOklabHueInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createOklabHueValue } from './createOklabHueValue';
import { CHANNEL_NAME } from './private';

describe('createOklabHueValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorOklabHueInput = 275.1211;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabHueValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should have the expected name', () => {
        const result = createOklabHueValue(valueContext, mockInput);

        expect(result.name()).toBe(CHANNEL_NAME);
    });

    it('should consume the input', () => {
        createOklabHueValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createOklabHueValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should expose value rounded to precision', () => {
        const result = createOklabHueValue(valueContext, mockInput, { precision: 0.2 });

        expect(result.get()).toEqual(275.2);
    });

    it('should clamp the input value', () => {
        const result = createOklabHueValue(valueContext, 365);

        expect(result.get()).toEqual(360);
    });

    it('should clamp the rounded value', () => {
        const result = createOklabHueValue(valueContext, 360, { precision: 400 });

        expect(result.get()).toEqual(360);
    });

    it('should convert to a color with given channels', () => {
        const result = createOklabHueValue(valueContext, mockInput);

        const color = result.toColor({ l: 0.6, c: 0.15 });
        const [l, c, h] = color.get().oklch();

        expect(l).toBeCloseTo(0.6);
        expect(c).toBeCloseTo(0.15);
        expect(h).toBeCloseTo(275.1211);
    });
});
