import { beforeEach, describe, expect, it } from 'vitest';

import { TypefaceValueAttributesInput } from '../../../inputs';
import { createDecisionContextMock } from '../../../mocks';
import { ValueContext, createValueContext } from '../../../values';

import { createTypefaceValue } from './createTypefaceValue';

describe('createTypefaceValue()', () => {
    const [decisionContextMock] = createDecisionContextMock();

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
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
