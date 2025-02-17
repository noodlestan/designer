import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock, createValueContextMock } from '../../../mocks';
import { type ValueContext, createValueContext } from '../../../values';
import { createSRGBHueValue } from '../srgb-hue-value';

import { createSRGBHueSet } from './createSRGBHueSet';

describe('createSRGBHueSet()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = 33;
    const hueValue = createSRGBHueValue(createValueContextMock()[0], mockInput);

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createSRGBHueSet(valueContext, [hueValue]);

        expect(result.context()).toBe(valueContext);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createSRGBHueSet(valueContext, [hueValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(hueValue);
    });
});
