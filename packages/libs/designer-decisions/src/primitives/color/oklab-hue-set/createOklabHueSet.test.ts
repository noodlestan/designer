import { beforeEach, describe, expect, it } from 'vitest';

import type { ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createDecisionContextMock, createValueContextMock } from '../../mocks';
import { createOklabHueValue } from '../oklab-hue-value';

import { createOklabHueSet } from './createOklabHueSet';

describe('createOklabHueSet', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = 33;
    const hueValue = createOklabHueValue(createValueContextMock()[0], mockInput);

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabHueSet(valueContext, [hueValue]);

        expect(result.context()).toBe(valueContext);
    });

    it('should expose the resolved value and allow .get()', () => {
        const result = createOklabHueSet(valueContext, [hueValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(hueValue);
    });
});
