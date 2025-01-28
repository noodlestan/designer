import { beforeEach, describe, expect, it } from 'vitest';

import type { ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createDecisionContextMock, createValueContextMock } from '../../mocks';
import { createColorValue } from '../value';

import { createColorSet } from './createColorSet';

describe('createColorSet', () => {
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

    it('should expose the resolved value and allow .get()', () => {
        const result = createColorSet(valueContext, [colorValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(colorValue);
    });
});
