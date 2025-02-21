import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock, createValueContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';
import { createColorValue } from '../color-value';

import { createColorSet } from './createColorSet';

describe('createColorSet()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = '#aa1234';
    const colorValue = createColorValue(createValueContextMock()[0], mockInput);

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createColorSet(valueContext, [colorValue]);

        expect(result.context()).toBe(valueContext);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createColorSet(valueContext, [colorValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(colorValue);
    });
});
