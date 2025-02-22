import { beforeEach, describe, expect, it } from 'vitest';

import type { TypefaceValueAttributesInput } from '../../../../inputs';
import { createDecisionContextMock } from '../../../../mocks';
import { type ValueContext, createValueContext } from '../../../../value';

import { createTypefaceValue } from './createTypefaceValue';

describe('createTypefaceValue()', () => {
    const [mockDecisionContext] = createDecisionContextMock();

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(mockDecisionContext);
    });

    describe('Given a value', () => {
        const input = {
            fontName: 'Foo',
        } as TypefaceValueAttributesInput;

        it('should have the provided context', () => {
            const result = createTypefaceValue(valueContext, input);

            expect(result.context()).toBe(valueContext);
        });

        it('should consume the input', () => {
            createTypefaceValue(valueContext, input);

            expect(valueContext.valueInput()).toEqual(input);
        });

        it('should expose the resolved value via .get()', () => {
            const result = createTypefaceValue(valueContext, input);

            expect(result.get().toString()).toEqual(input.fontName);
        });
    });
});
