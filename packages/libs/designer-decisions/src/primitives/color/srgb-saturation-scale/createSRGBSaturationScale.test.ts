import { beforeEach, describe, expect, it } from 'vitest';

import type { ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createDecisionContextMock, createValueContextMock } from '../../mocks';
import { createSRGBSaturationValue } from '../srgb-saturation-value';

import { createSRGBSaturationScale } from './createSRGBSaturationScale';

describe('createSRGBSaturationScale', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = 0.01;
    const saturationValue = createSRGBSaturationValue(createValueContextMock()[0], mockInput);

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createSRGBSaturationScale(valueContext, [saturationValue]);

        expect(result.context()).toBe(valueContext);
    });

    it('should expose the resolved value and allow .get()', () => {
        const result = createSRGBSaturationScale(valueContext, [saturationValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(saturationValue);
    });
});
