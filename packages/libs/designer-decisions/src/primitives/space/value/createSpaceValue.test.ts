import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock } from '../../../mocks';
import type { SpaceValueInput, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';

import { createSpaceValue } from './createSpaceValue';

describe('createSpaceValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = { value: 123.111, units: 'rem' } as SpaceValueInput;

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createSpaceValue(valueContext, mockInput);

        expect(result.context()).toBe(valueContext);
    });

    it('should consume the input', () => {
        createSpaceValue(valueContext, mockInput);

        expect(valueContext.valueInput()).toEqual(mockInput);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createSpaceValue(valueContext, mockInput);

        expect(result.get()).toEqual('123.111rem');
    });

    it('should expose value rounded to precision', () => {
        const result = createSpaceValue(valueContext, mockInput, { precision: 2 });

        expect(result.get()).toEqual('124rem');
    });

    it('should expose the value with units', () => {
        const result = createSpaceValue(valueContext, mockInput);

        expect(result.getValueWithUnits()).toEqual(mockInput);
    });

    it('should expose value with units rounded to precision', () => {
        const result = createSpaceValue(valueContext, mockInput, { precision: 2 });

        expect(result.getValueWithUnits().value).toEqual(124);
    });
});
