import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { ColorOklabChromaInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createOklabChromaValue } from './createOklabChromaValue';
import { CHANNEL_NAME } from './private';

describe('createOklabChromaValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput: ColorOklabChromaInput = 0.12;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabChromaValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should have the expected name', () => {
        const result = createOklabChromaValue(valueContext, mockInput);

        expect(result.name()).toBe(CHANNEL_NAME);
    });

    it('should consume the input', () => {
        createOklabChromaValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createOklabChromaValue(valueContext, mockInput);

        expect(result.get()).toEqual(mockInput);
    });

    it('should expose quantized value', () => {
        const result = createOklabChromaValue(valueContext, mockInput, { quantize: 0.2 });

        expect(result.get()).toEqual(0.2);
    });

    it('should clamp the input value', () => {
        const result = createOklabChromaValue(valueContext, 5);

        expect(result.get()).toEqual(0.5);
    });

    it('should clamp the rounded value', () => {
        const result = createOklabChromaValue(valueContext, 0.5, { quantize: 0.7 });

        expect(result.get()).toEqual(0.5);
    });

    it('should convert to a color with given channels', () => {
        const result = createOklabChromaValue(valueContext, mockInput);

        const color = result.toColor({ h: 300, l: 0.5 });
        const [l, c, h] = color.get().oklch();

        expect(h).toBeCloseTo(300);
        expect(c).toBeCloseTo(0.12);
        expect(l).toBeCloseTo(0.5);
    });
});
