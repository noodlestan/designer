import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock, createValueContextMock } from '../../../mocks';
import { type ValueContext, createValueContext } from '../../../values';
import { createSRGBLightnessValue } from '../srgb-lightness-value';

import { createSRGBLightnessScale } from './createSRGBLightnessScale';

describe('createSRGBLightnessScale()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = 0.01;
    const lightnessValue = createSRGBLightnessValue(createValueContextMock()[0], mockInput);

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createSRGBLightnessScale(valueContext, [lightnessValue]);

        expect(result.context()).toBe(valueContext);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createSRGBLightnessScale(valueContext, [lightnessValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(lightnessValue);
    });
});
