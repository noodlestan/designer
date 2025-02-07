import { beforeEach, describe, expect, it } from 'vitest';

import { createDecisionContextMock, createValueContextMock } from '../../../mocks';
import type { ValueContext } from '../../../types';
import { createValueContext } from '../../../values';
import { createOklabChromaValue } from '../oklab-chroma-value';

import { createOklabChromaScale } from './createOklabChromaScale';

describe('createOklabChromaScale()', () => {
    const [decisionContextMock] = createDecisionContextMock();
    const mockInput = 0.01;
    const chromaValue = createOklabChromaValue(createValueContextMock()[0], mockInput);

    let valueContext: ValueContext;

    beforeEach(() => {
        valueContext = createValueContext(decisionContextMock);
    });

    it('should have the provided context', () => {
        const result = createOklabChromaScale(valueContext, [chromaValue]);

        expect(result.context()).toBe(valueContext);
    });

    it('should expose the resolved value via .get()', () => {
        const result = createOklabChromaScale(valueContext, [chromaValue]);

        expect(result.get().items()).toHaveLength(1);
        expect(result.get().item(0)).toEqual(chromaValue);
    });
});
