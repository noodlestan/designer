import { beforeEach, describe, expect, it } from 'vitest';

import type { SpaceInputValue, ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createDecisionContextMock, createValueContextMock } from '../../mocks';
import { createSpaceValue } from '../value';

import { createSpaceScale } from './createSpaceScale';

describe('createSpaceScale', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = { value: 123, units: 'rem' } as SpaceInputValue;
    const spaceValue = createSpaceValue(createValueContextMock()[0], mockInput);

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createSpaceScale(valueContext, [spaceValue]);

        expect(result.context()).toBe(valueContext);
    });

    it('should expose the resolved value and allow .get()', () => {
        const result = createSpaceScale(valueContext, [spaceValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(spaceValue);
    });
});
