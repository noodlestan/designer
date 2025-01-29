import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabChromaValueExplicitInput } from '../../../types';

import { createColorOklabChromaValueExplicitModel } from './createColorOklabChromaValueExplicitModel';

describe('createColorOklabChromaValueExplicitModel()', () => {
    const model = createColorOklabChromaValueExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaValueExplicitInput['params'] = {
            value: 0.3,
        };

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(params.value);
        });
    });

    describe('Given input out of range', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaValueExplicitInput['params'] = {
            value: 2,
        };

        it('should create a clamped value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(0.5);
        });
    });
});
