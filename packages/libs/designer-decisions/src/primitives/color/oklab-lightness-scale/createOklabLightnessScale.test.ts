import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock, createValueContextMock } from '../../../mocks';
import type { ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createOklabLightnessValue } from '../oklab-lightness-value';

import { createOklabLightnessScale } from './createOklabLightnessScale';

describe('createOklabLightnessScale()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = 0.01;
    const lightnessValue = createOklabLightnessValue(createValueContextMock()[0], mockInput);

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabLightnessScale(valueContext, [lightnessValue]);

        expect(result.context()).toBe(valueContext);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createOklabLightnessScale(valueContext, [lightnessValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(lightnessValue);
    });
});
